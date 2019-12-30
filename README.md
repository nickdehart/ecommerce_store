[![Build Status](https://travis-ci.org/nickdehart/ecommerce_store.svg?branch=master)](https://travis-ci.org/nickdehart/ecommerce_store)

### E-Commerce Store
##### A configurable, mobile first, store application that can easily be changed to sell a variety of products.

- Developed with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app)
- Currently deployed on Now at [`https://ecommercestore.now.sh/`]( https://ecommercestore.now.sh/)
   - Now is a free serverless production environment
   - Unfortunately that means none of the API's will work while it is deployed on Now. 

#### Mobile View:
![alt text](./mobile.gif)

#### Desktop View:
![alt text](./desktop.gif)

Install it and run:
- Must create a .env file as it is needed for much of the API logic.
   - sample.env will work for running in development
   - MongoDB must be running

```
yarn
yarn dev
# or

npm install
npm run dev
```

Building for Production:

```
yarn build
yarn start
# or

npm run build
npm start
```