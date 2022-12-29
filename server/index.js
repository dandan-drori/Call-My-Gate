require('dotenv').config();
const express = require('express');
const app = express();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const path = require('path');

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/callGate', async (req, res) => {
    try {
        const options = {
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: process.env.TARGET_PHONE_NUMBER,
            from: process.env.ORIGIN_PHONE_NUMBER,
        };
        const callInstance = await client.calls.create(options);
        res.status(200).json(callInstance);
    } catch(err) {
        res.status(500).send(new Error(`Failed to make call, ${err}`));
    }
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
})