// next.config.js
const withCSS = require('@zeit/next-css')
const withOptimizedImages = require('next-optimized-images');
require('dotenv').config()

const imagesConfig = {
   // these are the default values so you don't have to provide them if they are good enough for your use-case.
   // but you can overwrite them here with any valid value you want.
   inlineImageLimit: 8192,
   imagesFolder: 'images',
   imagesName: '[name]-[hash].[ext]',
   handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
   optimizeImages: true,
   optimizeImagesInDev: true,
   mozjpeg: {
     quality: 80,
   },
   optipng: {
     optimizationLevel: 3,
   },
   pngquant: false,
   gifsicle: {
     interlaced: true,
     optimizationLevel: 3,
   },
   // svgo: {
   //   // enable/disable svgo plugins here
   // },
   // webp: {
   //   preset: 'default',
   //   quality: 75,
   // },
 }

module.exports = withOptimizedImages( 
   withCSS({
      ...imagesConfig,
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
      // target: 'serverless'
   })
)