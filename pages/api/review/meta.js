const MongoClient = require('mongodb').MongoClient;

// GETs avg rating of all products
export default (req, res) => {
   if (req.method === 'GET') {
      MongoClient.connect(process.env.DB_HOST, (err, client) => {
         if(err) {
            client.close()
            res.status(400).send({message: err});
         }

         const db = client.db(process.env.DB_NAME);
         const collection = db.collection(process.env.DB_REVIEW);
         try {

            collection.aggregate([
               { $group: { 
                  _id: '$id', 
                  avg: { $avg: '$rating' },
                  count: { $sum: 1 }
               } } ] )
               .toArray((err, aggs) => {
                  if(err)
                     res.status(400).send({message: err});
                  if(aggs) {
                     res.send(aggs)
                  } else {
                     res.send([])
                  }
               })

         } catch (e) {
            client.close()
            res.status(400).send({message: err});
         }
      })
   }
}