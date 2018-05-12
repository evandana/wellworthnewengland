# Email Server


## Deploy

1. *Set up environment variables*: Follow instructions in `/notes/secrets.md`
1. *Start the server* `firebase deploy --only functions`


## Run Locally

1. *Set up environment variables*: Follow instructions in `/notes/secrets.md`
1. `npm install`
1. `node index.js`


## Setting Up Private Keys

Go to [Service Account](https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk) page and click `Generate New Private Key`