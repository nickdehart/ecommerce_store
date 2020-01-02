const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');

// POST creates reviews if none exist for item
const post = (req, res) => {
   MongoClient.connect(`mongodb://${process.env.DB_USER_NAME}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`, (err, client) => {
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
            username: username,
            country: 'N/A',
            rating: +req.body.rating,
            text: req.body.text,
            date: req.body.date,
            images: [],
            useful: 0,
            useless: 0,
            id: req.body.id,
            name: req.body.name,
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