// next.config.js
const withCSS = require('@zeit/next-css')

module.exports = {
   env: {
      PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
      USPS_ID: process.env.USPS_ID,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
      DB_CONTACT: process.env.DB_CONTACT,
      DB_SUBSCRIBE: process.env.DB_SUBSCRIBE,
      DB_REVIEW: process.env.DB_REVIEW,
      DB_ORDERS: process.env.DB_ORDERS,
      NODE_ENV: process.env.NODE_ENV,
   }
}

module.exports = withCSS({
   cssLoaderOptions: {
      url: false
   }
})