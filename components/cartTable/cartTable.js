import DesktopTable from './desktopTable'
import MobileTable from './mobileTable'

const CartTable = (props) => {

   const { 
      config, 
      cart, 
      remove, 
      update,
      total,
      discountedTotal
   } = props;

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
