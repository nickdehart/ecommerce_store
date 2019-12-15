import products from './products'

const config = {
   title: "Ecommerce Store",
   mongo: {
      url: 'mongodb://localhost:27017',
      db: 'ecommerce',
      collections: {
         contact: 'messages',
         subscribe: 'subscribe'
      }
   },
   theme: {
      color: '#ee6e73',
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
         { href: '/contact', label: 'Contact' },
         { href: '/legal/returns', label: 'Returns' },
         { href: '/legal/privacy', label: 'Privacy Policy' },
         { href: '/legal/terms', label: 'Terms of Service' },
      ]
   },
   products: products,
}

export default config;

// THEME COLORS
// cool purple: #9c27b0;
// awesome salmon: #ee6e73;
// dark blue: #253167;