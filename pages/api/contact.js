const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');

export default (req, res) => {
   if (req.method === 'POST') {
      MongoClient.connect(config.default.mongo.url, (err, client) => {
         if(err) {
            res.status(400).send({
               message: err
            });
         }

         const db = client.db(config.default.mongo.db);
         const collection = db.collection(config.default.mongo.collections.contact);
         try {
            collection.insertOne(req.body)
            res.status(200).send('success')
         } catch (e) {
            res.status(400).send({
               message: e
            });
         }
         
      })
   } else {
      res.status(400).send({
         message: 'Not POST'
      });
   }
}