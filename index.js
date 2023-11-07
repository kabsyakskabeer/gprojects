
const functions = require('@google-cloud/functions-framework');

functions.http('subs', async(req, res) => {

const {google} = require('googleapis');
const spreadsheetId  ="1T-qCUbg1D7EizwKFZfuz1ztno065FZp58UeMtWW2FWU";

const auth = new google.auth.GoogleAuth({
  keyFile : "ealeart_credentials.json",
  scopes : "https://www.googleapis.com/auth/spreadsheets"
});


const client = await auth.getClient();
const googlesheets = google.sheets({version:'v4', auth: client});

const names = req.query.names;
const email = req.query.email;
const phone = req.query.phone;
const facility = req.query.facility;

  googlesheets.spreadsheets.values.append({
    auth, spreadsheetId,
    range: 'Subscribers!A:D',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [names, email, phone, facility]
      ]
    }

  });


});