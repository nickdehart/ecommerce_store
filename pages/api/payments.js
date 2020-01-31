const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch');

export default (req, res) => {
   if (req.method === 'POST') {

      let key = uuidv4()
      let items = [];
      for(var i = 0; i < req.body.cart.length; i++){
         items.push({
            id: config.default.products[req.body.cart[i].number].id,
            quantity: req.body.cart[i].quantity,
            name: config.default.products[req.body.cart[i].number].name,
            price: config.default.products[req.body.cart[i].number].price,
         })
      }

      let connectionString = `${process.env.DB_HOST}`
      if(process.env.DB_USER_NAME && process.env.DB_PASS)
         connectionString = `${process.env.DB_USER_NAME}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`
      MongoClient.connect(connectionString, (err, client) => {
         if(err) {
            try {
               client.close()
               res.status(400).json({ 'title': 'Could not connect to database.' })
            } catch (e) {
               res.status(400).json({ e })
            }
         }

         const db = client.db(config.default.db.name);
         const collection = db.collection(config.default.db.orders);
         try {
            collection.insertOne({
               status: 'CREATED',
               total: req.body.amount_money.amount / 100,
               items: items,
               shippingAddress: req.body.shippingAddress,
               billingAddress: req.body.billingAddress,
               id: key
            })
            client.close()
         } catch (e) {
            res.status(400).json({ e })
         }
      })

      let payload = {
         source_id: req.body.source_id,
         idempotency_key: key,
         amount_money: req.body.amount_money,
         autocomplete: true,
         location_id: config.default.square.location_id,
         reference_id: key,
         verification_token: req.body.verification_token,
         buyer_email_address: req.body.billingAddress.email,
         billing_address: {
            address_line_1: req.body.billingAddress.address1,
            address_line_2: req.body.billingAddress.address2,
            locality: req.body.billingAddress.city,
            postal_code: `${req.body.billingAddress.zip5}-${req.body.billingAddress.zip4}`,
            first_name: req.body.billingAddress.firstName,
            last_name: req.body.billingAddress.lastName
         },
         shipping_address: {
            address_line_1: req.body.shippingAddress.address1,
            address_line_2: req.body.shippingAddress.address2,
            locality: req.body.shippingAddress.city,
            postal_code: `${req.body.shippingAddress.zip5}-${req.body.shippingAddress.zip4}`,
            first_name: req.body.shippingAddress.firstName,
            last_name: req.body.shippingAddress.lastName
         },
         note: key,

      }
      fetch(config.default.square.url, {
         method: 'POST', 
         headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SQUARE_TOKEN}`,
            'Cache-Control': 'no-cache'
         },
         body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(json => {
         if(json.errors){
            res.status(400).json( json )
            return
         }
         res.status(200).json( json )
      })
      .catch((err) => {
         res.status(500).json({
            'title': 'Payment Failure',
            'result': err.response.text
          });
      })
   } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
   }
}