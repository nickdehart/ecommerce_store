const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');
const config = require('../../config');

export default (req, res) => {
   if (req.method === 'POST') {
      MongoClient.connect(process.env.DB_HOST, (err, client) => {
         if(err) {
            client.close()
            res.status(400).send({
               message: err
            });
         }

         const db = client.db(process.env.DB_NAME);
         const collection = db.collection(process.env.DB_CONTACT);
         try {
            Object.keys(req.body).forEach(param => {
               req.body[param] = sanitize(req.body[param])
            })
            collection.insertOne(req.body)
            client.close()
            res.status(200).send('success')
         } catch (e) {
            client.close()
            res.status(400).send({
               message: e
            });
         }
         
      })
   } else {
      res.status(404).send({
         message: 'Not Found'
      });
   }
}