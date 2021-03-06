const MongoClient = require('mongodb').MongoClient;
const config = require('../../../config');

// GETs avg rating of all products
export default (req, res) => {
   if (req.method === 'GET') {
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
            return
         }

         const db = client.db(config.default.db.name);
         const collection = db.collection(config.default.db.reviews);
         try {

            collection.aggregate([
               { $group: { 
                  _id: '$id', 
                  avg: { $avg: '$rating' },
                  count: { $sum: 1 }
               } } ] )
               .toArray((err, aggs) => {
                  client.close()
                  if(err)
                     res.status(400).json({ message: err })
                  if(aggs) {
                     res.status(200).json(aggs)
                  } else {
                     res.status(200).json([])
                  }
               })

         } catch (e) {
            res.status(400).json({ message: e })
         }
      })
   }
}
