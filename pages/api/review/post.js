const MongoClient = require('mongodb').MongoClient;
const sanitize = require('mongo-sanitize');
const config = require('../../../config');

// POST creates reviews if none exist for item
const post = (req, res) => {
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
         res.status(200).json({ message: 'success' })
      } catch (e) {
         res.status(400).json({ message: err })
      }
   })
}

export default post;