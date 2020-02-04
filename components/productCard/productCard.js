import React from 'react'
import Link from 'next/link';

const ProductCard = ({item, config, meta}) => {
   let stars = [];
   for(var i = 0; i < 5; i++) {
      if(i < Math.round(meta.avg)){
         stars.push(<i className="fas fa-star" 
                     style={{color: config.theme.color}}
                     key={`star-${i}`}></i>)
      } else {
         stars.push(<i className="far fa-star" 
                     style={{color: config.theme.color}}
                     key={`star-${i}`}></i>)
      }
   }

   return (
   <Link href={`/product/${item.id}`}>
      <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 item m-2">
         <img src={require(`../../public${item.assets}${item.images[0]}`)} className="card-img-top" alt={item.name} />
         <div className="card-body">
            <div>
               <h5 className="card-title">{item.name}</h5>
               <div className="mb-2 review-container">
                  {stars}&nbsp;{meta.count ? `(${meta.count})` : 'No Reviews'}
               </div>
            </div>
            <p className="card-text">{item.description}</p>
            <p className="price">{item.multiplier && <s>{`$${Math.floor(item.price * item.multiplier)}.99`}</s>}${item.price}</p>
         </div>

      <style jsx>{`
         .card-img-top {
         display: block;
         position: relative;
         left: 0;
         right: 0;
         top: 0;
         bottom: 0;
         width: 100%;
         }
         .item {
            position: relative;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
            min-width: 300px;
         }
         .item:hover {
            box-shadow: 0 2px 2px 0 ${config.theme.color}, 0 3px 1px -2px ${config.theme.color}, 0 1px 5px 0 ${config.theme.color};
            cursor: pointer;
         }
         .review-container {
            text-align: left;
         }
         s {
            color: #333;
            margin: 0px 15px 0px 0px;
         }
         .price {
            font-weight: 600;
            font-size: 1em;
            color: ${item.multiplier ? 'red' : '#333'};
         }
      `}</style>
      </div>
   </Link>
)}

export default ProductCard
