const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');
const config = require('../../config');

export default (req, res) => {
   if (req.method === 'POST') {
      let connectionString = `${process.env.DB_HOST}`
      if(process.env.DB_USER_NAME && process.env.DB_PASS)
         connectionString = `${process.env.DB_USER_NAME}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`
      MongoClient.connect(connectionString, (err, client) => {
         if(err) {
            try {
               client.close()
            } catch (e) {
               console.error(e)
            }
            res.status(400).json({ message: err })
         }

         const db = client.db(config.default.db.name);
         const collection = db.collection(config.default.db.contact);
         try {
            Object.keys(req.body).forEach(param => {
               req.body[param] = sanitize(req.body[param])
            })
            collection.insertOne(req.body)
            client.close()
            res.status(200).json({ message: 'success' })
         } catch (e) {
            res.status(400).json({ message: e })
         }
         
      })
   } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
   }
}