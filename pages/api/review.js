const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');

export default (req, res) => {
   if (req.method === 'GET') {
      MongoClient.connect(process.env.DB_HOST, (err, client) => {
         if(err) {
            res.status(400).send({
               message: err
            });
         }

         const db = client.db(process.env.DB_NAME);
         const collection = db.collection(process.env.DB_REVIEW);
         try {
            collection.find({'name': req.query.name}).toArray((err, docs) => {
               if(err) {
                  res.status(400).send({
                     message: err
                  });
               }
               client.close()
               if(docs)
                  res.send(docs);
               else
                  res.send({})
            })
         } catch (e) {
            res.status(400).send({
               message: e
            });
         }
      })
   } else if (req.method === 'POST') {
      MongoClient.connect(process.env.DB_HOST, (err, client) => {
         if(err) {
            client.close()
            res.status(400).send({
               message: err
            });
         }

         const db = client.db(process.env.DB_NAME);
         const collection = db.collection(process.env.DB_REVIEW);
         Object.keys(req.body).forEach(param => {
            req.body[param] = sanitize(req.body[param])
         })

         try {
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

            let record = {
               name: req.body.name,
               count: 1,
               avg: +req.body.rating,
               stars: {
                  '5': +req.body.rating === 5 ? '100%' : '0%', 
                  '4': +req.body.rating === 4 ? '100%' : '0%', 
                  '3': +req.body.rating === 3 ? '100%' : '0%', 
                  '2': +req.body.rating === 2 ? '100%' : '0%', 
                  '1': +req.body.rating === 1 ? '100%' : '0%', 
               },
               reviews: [
                  {
                     username: username,
                     country: 'N/A',
                     rating: +req.body.rating,
                     text: req.body.review,
                     date: req.body.date,
                     useful: 0,
                     useless: 0,
                     images: [],
                  }
               ]
            }
            collection.insertOne(record)
            client.close()
            res.status(200).send('success')
         } catch (e) {
            client.close()
            res.status(400).send({
               message: e
            });
         }
         
      })
   } else if (req.method === 'PUT') {
      MongoClient.connect(process.env.DB_HOST, (err, client) => {
         if(err) {
            client.close()
            res.status(400).send({
               message: err
            });
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