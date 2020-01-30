// next.config.js
const withCSS = require('@zeit/next-css')
require('dotenv').config()

module.exports = withCSS({
   cssLoaderOptions: {
      url: false
   },
   env: {
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
      USPS_ID: process.env.USPS_ID,
      DB_HOST: process.env.DB_HOST,
      SQUARE_TOKEN: process.env.SQUARE_TOKEN
   },
   target: 'serverless'
})