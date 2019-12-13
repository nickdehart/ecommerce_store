import products from './products'

const config = {
   title: "Ecommerce Store",
   theme: {
      color: '#ee6e73'
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