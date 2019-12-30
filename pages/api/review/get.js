const MongoClient = require('mongodb').MongoClient;

// GET retrieves reviews
const get = (req, res) => {
   MongoClient.connect(process.env.DB_HOST, (err, client) => {
      if(err) {
         client.close()
         res.status(400).send({message: err});
      }

      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.DB_REVIEW);
      try {
         // aggregation counts 
         collection.aggregate([
            { $match: { 'id': req.query.id } },
            { $group: { _id: "$rating", count: { $sum: 1 } } }
         ]).toArray((err, aggs) => {
            if(err)
               res.status(400).send({message: err});
            collection.find({'id': req.query.id}).toArray((err, docs) => {
               if(err)
                  res.status(400).send({message: err});
               client.close()
               aggs.push({_id: 0, reviews: docs})
               res.send(aggs);
            })
         })
      } catch (e) {
         client.close()
         res.status(400).send({message: err});
      }
   })
}

export default get;
// db.reviews.aggregate({$group:{_id:"$rating", data:{$push:"$$ROOT"}}})