const functions = require('firebase-functions');
const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ apiKey: "5699fd4c-8c5c-44be-9a3f-227dec35531f"})

exports.writeToHubspot = functions.region('australia-southeast1').https.onCall((data, context) => {

    console.log("DATA:")
    console.log(data)
    
    return new Promise((resolve, reject) => {
        let contactObj = {
            properties: {
                firstname: data.parentName,
                email: data.email,
                phone: data.mobileNumber,
                party_location: data.store === "balwyn" ? "Balwyn" : "Essendon",
                test_service: "In-store Party;Mobile Party;Holiday Program;Activity Kits"
            }
        }
          
        hubspotClient.crm.contacts.basicApi.create(contactObj)
            .then(result => {console.log("SUCCESS"); resolve(result)})
            .catch(err => {
                if (err.statusCode === 409) {
                    const filter = { propertyName: 'email', operator: 'GET', value: data.email }
                    const filterGroup = { filters: [filter] }
                    const searchRequest = { filterGroups: [filterGroup] }
                    const getResult = await hubspotClient.crm.contacts.searchApi.doSearch(searchRequest)
                    console.log(JSON.stringify(getResult.body))
                }
                reject(err)
            })
    })
});
