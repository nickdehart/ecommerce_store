const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');
const config = require('../../config');

export default (req, res) => {
   if (req.method === 'POST') {
      let connectionString = `mongodb://${process.env.DB_HOST}`
      if(process.env.DB_USER_NAME && process.env.DB_PASS)
         connectionString = `mongodb://${process.env.DB_USER_NAME}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`
      MongoClient.connect(connectionString, (err, client) => {
         if(err) {
            try {
               client.close()
            } catch (e) {
               console.error(e)
            }
            res.status(400).send({
               message: err
            });
            return
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