
export default (req, res) => {
   if (req.method === 'GET') {
      console.log(req.query)
   } else {
      console.log('not GET')
   }
   res.sendStatus(200)
 }