const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch');

export default (req, res) => {
   if (req.method === 'POST') {
      let payload = {
         source_id: req.body.source_id,
         verification_token: req.body.verification_token,
         autocomplete: true,
         location_id: config.default.square.location_id,
         amount_money: req.body.amount_money,
         idempotency_key: uuidv4()
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
         let connectionString = `${process.env.DB_HOST}`
         if(process.env.DB_USER_NAME && process.env.DB_PASS)
            connectionString = `${process.env.DB_USER_NAME}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`
         MongoClient.connect(connectionString, (err, client) => {
            if(err) {
               try {
                  client.close()
                  res.status(400).json( json )
               } catch (e) {
                  console.error(e)
                  res.status(400).json( json )
               }
            }

            let items = [];
            for(var i = 0; i < req.body.cart.length; i++){
               items.push({
                  id: config.default.products[req.body.cart[i].number].id,
                  name: config.default.products[req.body.cart[i].number].name,
                  price: config.default.products[req.body.cart[i].number].price,
               })
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
                  payment: json.payment
               })
               client.close()
            } catch (e) {
               console.error(e)
               res.status(400).json( json )
            }
         })
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