const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export const handler = async(event) => {
    let phone = ''
    let service = 'sms'

    if (event.queryStringParameters && event.queryStringParameters.phone) {
        console.log("Received phone number: " + event.queryStringParameters.phone);
        phone = event.queryStringParameters.phone;
    }

    if (event.queryStringParameters && event.queryStringParameters.service) {
        console.log("Received service: " + event.queryStringParameters.service);
        service = event.queryStringParameters.service;
    }

    client.verify.v2.services(process.env.TWILIO_VERIFY_SID)
                .verifications
                .create({to: phone, channel: service})
                .then(verification => console.log(verification.sid));

                let responseBody = {
                    sid: verification.sid,
                    input: event
                }


                let response = {
                    statusCode: responseCode,
                    headers: {},
                    body: JSON.stringify(responseBody)
                };
    return response;
};
