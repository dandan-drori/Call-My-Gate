require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

client.calls.create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: process.env.TARGET_PHONE_NUMBER,
    from: process.env.ORIGIN_PHONE_NUMBER,
}).then((callInstance) => {
    console.log('Call made successfully');
    console.log(callInstance);
}).catch((err) => {
    console.log('Failed to make call');
    console.log('Error:', err);
});