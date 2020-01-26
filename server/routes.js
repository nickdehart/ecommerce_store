const routes = module.exports = require('next-routes')()
 
routes
.add('cart')
.add('contact')
.add('legal')
.add({ name: 'privacy', pattern: '/legal/privacy', page: '/legal/privacy' })
.add({ name: 'returns', pattern: '/legal/returns', page: '/legal/returns' })
.add({ name: 'terms', pattern: '/legal/terms', page: '/legal/terms' })
.add('products')
.add({ name: 'product', pattern: '/product/:id', page: '/product/:id' })
