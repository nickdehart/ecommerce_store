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

  // 3. Call PayPal to create the authorization
  const request = new checkoutNodeJssdk.orders.OrdersAuthorizeRequest(orderID);
  request.requestBody({});

  try {
    const authorization = await payPalClient.client().execute(request);

    // 4. Save the authorization ID to your database
    const authorizationID = authorization.result.purchase_units[0]
        .payments.authorizations[0].id
    await saveAuthorization(authorization);
    

  } catch (err) {

    // 5. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 6. Return a successful response to the client
  res.send(200);
}

async function saveAuthorization(authorization) {
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

      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.DB_ORDERS);
      try {
         collection.insertOne(authorization.result)
         client.close()
      } catch (e) {
         console.log(e)
      }
      
   })
}