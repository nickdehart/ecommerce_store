import {Link} from '../../server/routes'

const MobileTable = (props) => {
   const [showEdit, setShowEdit] = React.useState(-1);
   const { config, cart, remove, update, total, discountedTotal } = props;

   const handleClick = (index) => {
      if(showEdit === index){
         setShowEdit(-1)
      } else {
         setShowEdit(index)
      }
   }

   return (
   <>
      <table className="table mobile-table">
         <thead>
            <tr>
               <th scope="col">Product</th>
               <th scope="col">Price</th>
            </tr>
         </thead>
         <tbody>
            {cart.map((item, index) => {
               return (
               <React.Fragment key={`cart-item-${index}`}>
               <tr >
                  <td style={{display: 'flex'}}>
                     <Link route={`/products/${item.name.toLowerCase().replace(/[^A-Z0-9]/gi, '_')}`}>
                        <img src={`${config.products[item.number].assets}${config.products[item.number].images[0]}`} 
                           className="img-fluid cart-img mr-3"/>
                     </Link>
                     <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <p>{item.name}</p>
                        <small>Quantity: {item.quantity}</small>
                        <div className="edit-btn" onClick={() => handleClick(index)}>
                           Edit
                        </div>
                     </div>
                  </td>
                  <td>
                     {
                        item.quantity > 1 ? 
                        <>
                           <p><s>${(config.products[item.number].price).toFixed(2)}</s></p>
                           <p>${(config.products[item.number].price - 
                                 (config.products[item.number].price * item.discount)).toFixed(2)}</p>
                        </>
                        :
                        <p>${config.products[item.number].price}</p>                  
                     }
                  </td>
               </tr>
               {showEdit === index &&
                  <tr>
                     <td colSpan={2}>
                        <form onSubmit={(event) => update(event, item)} 
                           style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <small style={{borderBottom: '1px solid gray'}} onClick={() => remove(item)}>Remove</small>
                        <div>
                           <small>Quantity:</small>
                           <input
                              style={{width: '50px', fontSize: 'small'}}
                              name="quantity"
                              type="number"
                              defaultValue={item.quantity}
                              min={1}
                           />
                        </div>
                        <button className="submit-btn" type="submit">
                           Update
                        </button>
                        </form>
                     </td>
                  </tr>
               }
               </ React.Fragment>
               )
            })}
            <tr>
               <td style={{display: 'flex', justifyContent: 'space-between'}}>
               Subtotal:
               {total !== discountedTotal && <s>${total.toFixed(2)}</s>}
               </td>
               <td>
               ${discountedTotal.toFixed(2)}
               </td>
            </tr>
         </tbody>
      </table>

   <style jsx>{`
   @media (max-width: 767px){
      .cart-img {
         max-width: 90px;
      }
      .edit-btn {
         text-transform: uppercase;
         color: white;
         background-color: ${config.theme.color};
         font-size: small;
         font-weight: 600;
         text-align: center;
         width: 80px;
         padding: 5px;
         margin: 5px 5px 5px 0px;
      }
      .edit-btn:hover {
         cursor: pointer;
      }
      .submit-btn {
         text-transform: uppercase;
         color: white;
         background-color: ${config.theme.color};
         font-size: small;
         font-weight: 600;
         text-align: center;
         width: 80px;
         padding: 5px;
         margin: 5px 5px 5px 0px;
         border: 0px;
      }
      s {
         color: red;
      }
      p {
         margin-bottom: 0px;
      }
   }
   @media (min-width: 768px){
      .mobile-table {
         display: none;
      }
   }
   `}</style>
   </>
   )
}

export default MobileTable
