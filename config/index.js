import products from './products'

const config = {
   title: "Ecommerce Store",
   // in case you have a logo
   // logo: {
   //    src: '/logo.svg',
   //    width: '175px',
   //    height: '30spx'
   // },
   theme: {
      color: '#ee6e73',
   },
   db: {
      name: 'ecommerce', // name of the database to be used
      contact: 'messages', // collection for contact
      subscribe: 'subscribe', // collection for email subscriptions
      reviews: 'reviews', // collection for reviews
      orders: 'orders' // collection for orders
   },
   home: {
      banner: '/banner.jpg',
      promo: 'Up to 60% off',
      reason: 'Cyber Week Sale',
      showSubscribe: true,
   },
   promotion: {
      text: "CHRISTMAS SALE + FREE SHIPPING ON ORDERS OVER $30",
      color: "#fff",
   },
   header: {
      links: [
         { href: '/', label: 'Home' },
         { href: '/products', label: 'Products' },
         { href: '/contact', label: 'Contact' },
      ]
   },
   footer: {
      links: [
         // { href: '/contact', label: 'Contact' },
         { href: '/legal/returns', label: 'Returns' },
         { href: '/legal/privacy', label: 'Privacy' },
         { href: '/legal/terms', label: 'Terms' },
      ]
   },
   products: products,
}

export default config;

// THEME COLORS
// cool purple: #9c27b0;
// awesome salmon: #ee6e73;
// dark blue: #253167;