const MongoClient = require('mongodb').MongoClient;

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
            res.status(400).send({message: err});
            return
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
                  client.close()
                  if(err)
                     res.status(400).send({message: err});
                  if(aggs) {
                     res.send(aggs)
                  } else {
                     res.send([])
                  }
               })

         } catch (e) {
            res.status(400).send({message: err});
         }
      })
   }
}
