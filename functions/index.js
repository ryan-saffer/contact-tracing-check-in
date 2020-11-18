const functions = require('firebase-functions');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const API_KEY = "8dad51563d4f3fe08062c6dcb02300cf-us12"
const LIST_ID = "72e0eeb982"

mailchimp.setConfig({
    apiKey: API_KEY,
    server: "us12"
})

exports.writeToMailchimp = functions.region('australia-southeast1').https.onCall((data, context) => {

    console.log("Writing to mailchimp with data:")
    console.log(data)

    return mailchimp.lists.addListMember(LIST_ID, {
        email_address: data.email,
        status: "transactional",
        merge_fields: {
            "FNAME": data.parentName
        }
    })
    .then(() => console.log("Write succeeded!"))
    .catch(err => console.error(err))
});
