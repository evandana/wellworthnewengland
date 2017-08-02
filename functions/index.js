/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';



// [START imports]
var firebase = require('firebase-admin');
// [END imports]
var nodemailer = require('nodemailer');
// var schedule = require('node-schedule');
var Promise = require('promise');
// var escape = require('escape-html');
const path = require('path');
const os = require('os');
const fs = require('fs');
const util = require('util');

var whitelist = ['http://wellworthnewengland.com'];
// const cors = require('cors')({origin: true});
// const cors = require('cors')({origin: 'http://wellworthnewengland.com'});
const cors = require('cors')({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log('cors allowed');
      callback(null, true)
    } else {
      console.log('cors not allowed');
      callback(new Error('Not allowed by CORS'))
    }
  }
});

// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.


var serviceAccount = require('./zellner-email-firebase-adminsdk-2ool3-7ba626a85d.json');
const admin = require('firebase-admin');

// Configure the email transport using the default SMTP transport and a GMail account.
// See: https://nodemailer.com/
// For other types of transports (Amazon SES, Sendgrid...) see https://nodemailer.com/2-0-0-beta/setup-transporter/
var mailTransport = nodemailer.createTransport(`smtps://${functions.config().email.account}%40gmail.com:${functions.config().email.pw}@smtp.gmail.com`);

// [START initialize]
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://zellner-email.firebaseio.com'
});
// admin.initializeApp(functions.config().firebase);
// [END initialize]


exports.placeorder = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (validateRequest(req)) {

      console.log('req body', req.body);

      // remove unnecessary props not intended to be in the email
      delete req.body.info;
      delete req.body.submit;

      var emailRecipients = [{ email: `${functions.config().email.account}@gmail.com` }];
      sendEmail(emailRecipients, 'ORDER ITEMS: ' + JSON.stringify(req.body));

      console.log('email obj', emailRecipients);

      res.status(200).send('sending email to ' + `${functions.config().email.account}@gmail.com` + ' with contents: ' + JSON.stringify(req.body));
    } else {

      // do nothing if origin is not correct
      res.status(500).send('invalid origin');
    }
  })


});

function validateRequest(req) {

  console.log('headers', 'req', req.headers);

  if (req.method === "POST" &&
    (req.headers.origin.substr(0, 'http://wellworthnewengland.com'.length) === 'http://wellworthnewengland.com' || req.headers.origin === 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop')
  ) {

    // if ( validateHash(req.headers.wellworth) ) {
    return true;

  } else {
    // origin not allowed
    return false;
  }

}

function generateHash() {
  var t = new Date();
  t = t.getTime();
  return encodeNum(t);
}

function encodeNum(n) {
  var c = 'abcdefghijklmnopqrstuvwxyz';
  var nArray = n.toString().split('');
  var cArray = [];
  var offset = 0;
  for (var i = 0; i < nArray.length; i++) {
    cArray.push(c[parseInt(nArray[i], 10) + offset]);
  }
  return c[offset] + cArray.join('');
}


function decodeNum(c) {
  var a = 'abcdefghijklmnopqrstuvwxyz';
  var cArray = c.split('');
  var nArray = [];
  var offset = a.indexOf(cArray.shift());
  for (var i = 0; i < cArray.length; i++) {
    nArray.push(a.indexOf(cArray[i]) - offset);
  }
  return parseInt(nArray.join(''), 10);
}

function validateHash(hash) {

  var decodedNum = decodeNum(hash);

  var now = new Date();
  now = now.getTime();

  var valid = decodedNum > now - 10 * 1000 && decodedNum < now + 10 * 1000;

  return valid;
}


/*
 * Send email
 */
function sendEmail(users, emailHtml) {
  console.log('start test email function');
  Object.keys(users).forEach(function (uid) {
    var user = users[uid];
    if (user.email) {
      var mailOptions = {
        from: '"WellWorthNewEngland Email Server" <noreply@firebase.com>',
        to: user.email,
        subject: 'New Order from WellWorthNewEngland.com',
        html: emailHtml
      };
      console.log('sending mail');
      mailTransport.sendMail(mailOptions).then(function () {
        console.log('Order email sent to: ' + user.email);
        // Save the date at which we sent the weekly email.
        // [START basic_write]
        // return firebase.database().child('/users/' + uid + '/lastSentWeeklyTimestamp')
        //     .set(firebase.database.ServerValue.TIMESTAMP);
        // [END basic_write]
      }).catch(function (error) {
        console.log('Failed to send weekly top posts email:', error);
      });
    }
  });
}
