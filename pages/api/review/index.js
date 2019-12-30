import get from './get'
import post from './post'

// Reviews API
// GET retrieves reviews
// POST creates reviews if none exist for item
// PUT updates reviews if reviews exist for item
export default (req, res) => {
   if (req.method === 'GET') {
      get(req, res)
   } else if (req.method === 'POST') {
      post(req, res)
   } else {
      res.status(404).send({message: 'Not Found'});
   }
 }