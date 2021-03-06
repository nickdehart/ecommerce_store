const MongoClient = require('mongodb').MongoClient;
const config = require('../../../config');

// GET retrieves reviews
const get = (req, res) => {
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
         // aggregation counts 
         collection.aggregate([
            { $match: { 'id': req.query.id } },
            { $group: { _id: "$rating", count: { $sum: 1 } } }
         ]).toArray((err, aggs) => {
            if(err)
               res.status(400).json({ message: err })
            collection.find({'id': req.query.id}).toArray((err, docs) => {
               if(err)
                  res.status(400).json({ message: err })
               client.close()
               aggs.push({_id: 0, reviews: docs})
               res.status(200).json(aggs)
            })
         })
      } catch (e) {
         res.status(400).json({ message: err })
      }
   })
}

export default get;
// db.reviews.aggregate({$group:{_id:"$rating", data:{$push:"$$ROOT"}}})