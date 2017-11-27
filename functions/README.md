# Email Server


## Deploy

1. *Set up environment variables*: Follow instructions in `**/function-secrets.md`
1. *Start the server* `firebase deploy --only functions`


## Run Locally

1. `npm install -g firebase-tools`
1. *Set up environment variables*: Follow instructions in `**/function-secrets.md`
1. `npm install`
1. `node index.js`


## Setting Up Private Keys

Go to [Service Account](https://console.firebase.google.com/u/0/project/wellworthnewengland-1e81a/settings/serviceaccounts/adminsdk) page and click `Generate New Private Key`