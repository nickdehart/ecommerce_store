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
         // init stars object
         let stars = {
            '5': '0%',
            '4': '0%',
            '3': '0%',
            '2': '0%',
            '1': '0%',
         }
         // aggregation counts 
         let name = req.query.name.replace(/[^A-Z0-9]/gi, ' ')
         collection.aggregate([
            { $match: { name: name } },
            { $match: { reviews: { $not: { $size: 0 } } } },
            { $unwind: "$reviews" },
            { $group: { _id: '$reviews.rating', count: { $sum:1 } } } ] )
            .toArray((err, aggs) => {
               if(err)
                  res.status(400).send({message: err});
               let total = 0;
               if(aggs) {
                  for(var i = 0; i < aggs.length; i++)
                     total += aggs[i].count;
                  for(var i = 0; i < aggs.length; i++)
                     stars['' + aggs[i]._id] = ((aggs[i].count / total) * 100).toFixed(0) + '%'
               }
            })
         collection.find({'name': name}).toArray((err, docs) => {
            client.close()
            if(err)
               res.status(400).send({message: err});
            if(docs.length > 0) {
               docs[0].stars = stars
               res.send(docs);
            } else
               res.send({})
         })
      } catch (e) {
         client.close()
         res.status(400).send({message: err});
      }
   })
}

export default get;