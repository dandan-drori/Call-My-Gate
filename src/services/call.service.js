export async function makeCall() {
    const url = process.env.NODE_ENV === 'production' ?
        'https://call-my-gate.onrender.com/callGate' : 
        'localhost:3000/callGate';
    try {
        return await fetch(url);
    } catch (err) {
        console.log('Error calling gate | call.service.js', err);
        throw err;
    }
}