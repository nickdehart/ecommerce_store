const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');

// PUT updates reviews if reviews exist for item
const put = (req, res) => {
   MongoClient.connect(process.env.DB_HOST, (err, client) => {
      if(err) {
         client.close()
         res.status(400).send({message: err});
      }

      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.DB_REVIEW);
      Object.keys(req.body).forEach(param => {
         req.body[param] = sanitize(req.body[param])
      })

      let username = ''
      for(var i = 0; i < req.body.username.length; i++) {
         if(i === 0){
            username += req.body.username[0]
         } else if (i === req.body.username.length - 1) {
            username += req.body.username[req.body.username.length - 1]
         } else {
            username += '*'
         }
      }

      let newReview = {
         username: username,
         country: 'N/A',
         rating: +req.body.rating,
         text: req.body.review,
         date: req.body.date,
         useful: 0,
         useless: 0,
         images: [],
      }

      let total = +req.body.avg * +req.body.count;
      total += +req.body.rating;
      let newAvg = total / (+req.body.count + 1)
      
      try {
         
         collection.updateOne(
            {'name': req.body.name},
            { 
               $push: { 'reviews': newReview},
               $set: { 'avg': newAvg },
               $inc: { 'count': 1 }
            }
         )
         client.close()
         res.status(200).send('success')
      } catch (e) {
         client.close()
         res.status(400).send({message: err});
      } 
   })
}

export default put;