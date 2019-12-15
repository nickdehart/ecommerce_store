import DesktopTable from './desktopTable'
import MobileTable from './mobileTable'

const CartTable = (props) => {

   const { config, cart, remove, update } = props;

   let discountedTotal = 0;
   let total = 0;
   for(var i = 0; i < cart.length; i++){
      let price = config.products[cart[i].number].price * cart[i].quantity;
      total += price;
      switch(cart[i].quantity){
         case 1:
            discountedTotal += price;
            break;
         case 2:
            discountedTotal += parseFloat((price - (price * .1)).toFixed(2));
            cart[i].discount = .1;
            break;
         case 3:
            discountedTotal += parseFloat((price - (price * .15)).toFixed(2));
            cart[i].discount = .15;
            break;
         default:
            discountedTotal += parseFloat((price - (price * .2)).toFixed(2));
            cart[i].discount = .2;
            break;
      }
   }

   return (
   <>
      <DesktopTable 
         config={config} 
         cart={cart} 
         remove={remove} 
         update={update} 
         total={total} 
         discountedTotal={discountedTotal} 
      />
      <MobileTable 
         config={config} 
         cart={cart} 
         remove={remove} 
         update={update} 
         total={total} 
         discountedTotal={discountedTotal} 
      />

   <style jsx>{`
   `}</style>
   </>
   )
}

export default CartTable
