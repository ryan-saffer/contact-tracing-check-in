const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const db = admin.database()
const mailchimp = require('@mailchimp/mailchimp_marketing');

const API_KEY = "8dad51563d4f3fe08062c6dcb02300cf-us12"
const LIST_ID = "72e0eeb982"

mailchimp.setConfig({
    apiKey: API_KEY,
    server: "us12"
})

function toTwoDigits(input) {
    return ("0" + input).slice(-2)
}

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

exports.deleteOutdatedEntries = functions
    .region('australia-southeast1')
    .pubsub.schedule('0 0 * * *')
    .timeZone('Australia/Victoria')
    .onRun((context) => {

        const date = new Date()
        date.setDate(date.getDate() - 29) // retain data for 28 days, so delete the data from 29 days ago
        const dateString = `${date.getFullYear()}${toTwoDigits(date.getMonth() + 1)}${toTwoDigits(date.getDate())}`

        functions.logger.log("Removing entries on date:", dateString)
        db.ref(dateString).remove()
    })