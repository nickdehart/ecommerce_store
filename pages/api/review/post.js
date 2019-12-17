const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');

// POST creates reviews if none exist for item
const post = (req, res) => {
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
         res.status(400).send({message: err});
      }
   })
}

export default post;