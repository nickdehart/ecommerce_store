const config = require('../../../config');
// 1. Set up your server to make calls to PayPal
const MongoClient = require('mongodb').MongoClient;

// 1a. Import the SDK package
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('./payPalClient');

// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {

  // 2a. Get the order ID from the request body
  const orderID = req.body.orderID;

  // 3. Call PayPal to capture the order
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await payPalClient.client().execute(request);

    // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
    const captureID = capture.result.purchase_units[0]
        .payments.captures[0].id;
   // await database.saveCaptureID(captureID);
   await saveTransaction(capture);

  } catch (err) {

    // 5. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 6. Return a successful response to the client
  res.send(200);
}

async function saveTransaction(capture) {
   let connectionString = `${process.env.DB_HOST}`
   if(process.env.DB_USER_NAME && process.env.DB_PASS)
      connectionString = `${process.env.DB_USER_NAME}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`
   MongoClient.connect(connectionString, (err, client) => {
      if(err) {
         console.log(err)
         try {
            client.close()
         } catch (e) {
            console.error(e)
         }
      }

      const db = client.db(config.default.db.name);
      const collection = db.collection(config.default.db.orders);
      try {
         collection.insertOne(capture.result)
         client.close()
      } catch (e) {
         console.log(e)
      }
      
   })
}