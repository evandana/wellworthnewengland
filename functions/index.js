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



var firebase = require('firebase-admin');
var nodemailer = require('nodemailer');

// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');

var mailTransport = nodemailer.createTransport(`smtps://${functions.config().email.account}%40gmail.com:${functions.config().email.pw}@smtp.gmail.com`);

exports.ordercreated = functions.database.ref('/orders/{orderId}')
  .onCreate(event => {
    
    console.log('raw event data received', event._data)

    // Grab the current value of what was written to the Realtime Database.
    const newOrder = event._data;
    var emailRecipients = [`${functions.config().email.account}@gmail.com`, newOrder.customerInfo.email];

    console.log('received', JSON.stringify(newOrder));
    console.log('email recipients: ', emailRecipients);
    // console.log('email disabled for now');

    sendEmail([emailRecipients, newOrder.customerInfo.email], createEmailHtml(newOrder));

    return newOrder;
  }
);

function createEmailHtml(order) {
  var emailStr = '';
  emailStr += 'ORDER FROM ZELLNER DISTRIBUTING WEBSITE' + '<br/><br/>';
  emailStr += 'FROM: ' + order.customerInfo.name + ' ('+order.customerInfo.email+')' + '<br/><br/>';
  emailStr += 'TIME: ' + new Date(order.timestamp) + '<br/><br/>';
  emailStr += 'BRANCH NAME: ' + order.branchName + '<br/><br/>';
  emailStr += 'MANAGER: ' + order.manager + '<br/><br/>';
  // emailStr += 'TOTAL: $' + order.total/100 + '<br/>';
  emailStr += 'ITEMS: ' + '<br/>';

  Object.keys(order.items).forEach(key => {
    const item = order.items[key]
    emailStr += item.quantity + ' x ' + item.name + ' ( ' + item.optionSize + ' @ $ ' + item.optionPrice/100 + ' ) ' + '<br/>';
  });

  return emailStr;
}

/*
 * Send email
 */
function sendEmail(users, emailHtml) {
  console.log('start test email function');
  users.forEach(function (email) {
    if (email) {
      var mailOptions = {
        from: '"WellWorthNewEngland Email Server" <noreply@firebase.com>',
        to: email,
        subject: 'New Order from WellWorthNewEngland.com',
        html: emailHtml
      };
      console.log('sending mail');
      mailTransport.sendMail(mailOptions).then(function () {
        console.log('Order email sent to: ' + email);
        return true;
      }).catch(function (error) {
        console.log('Failed to send order email:', error);
        return false;
      });
    }
  });
}
