// pages/api/razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");

// Initialize razorpay object
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
});

async function handler(req, res) {
    // TODO: Make sure to handle your payment here.
    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = 1 * 100; // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
        amount: amount.toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {},
    };
}
export default handler;
