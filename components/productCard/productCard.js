import React from 'react'
import style from './productCard.style'
import {Link} from '../../routes'

const ProductCard = ({item}) => (
   <Link route={`/products/${item.name.toLowerCase().replace(/[^A-Z0-9]/gi, '_')}`}>
      <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 item m-2">
         <img src={`${item.assets}${item.images[0]}`} className="card-img-top" alt={item.name} />
         <div className="card-body">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <h5 className="card-title">{item.name}</h5>
               {/* <span><i className="fas fa-cart-plus cart-icn"></i></span> */}
            </div>
            <p className="card-text">{item.description}</p>
            <p><b>Price: ${item.price}</b></p>
         </div>

      <style jsx>{style}</style>
      </div>
   </Link>
)

export default ProductCard
