const routes = module.exports = require('next-routes')()
 
routes
.add('cart')
.add('contact')
.add('legal')
.add({ name: 'privacy', pattern: '/legal/privacy', page: '/legal/privacy' })
.add({ name: 'returns', pattern: '/legal/returns', page: '/legal/returns' })
.add({ name: 'terms', pattern: '/legal/terms', page: '/legal/terms' })
.add('products')
.add({ name: 'product', pattern: '/products/:id', page: '/products/product' })

// .add('user', '/user/:id', 'profile')
// .add('/:noname/:lang(en|es)/:wow+', 'complex')
// .add({name: 'beta', pattern: '/v3', page: 'v3'})