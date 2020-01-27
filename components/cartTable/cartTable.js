import DesktopTable from './desktopTable'
import MobileTable from './mobileTable'
import useWindowSize from '../../hooks/useWindowSize'

const CartTable = (props) => {

   const { 
      config, 
      cart, 
      remove, 
      update,
      total,
      discountedTotal
   } = props;

   const size = useWindowSize();

   return (
   <>
      {size && size.width > 767 &&
      <DesktopTable 
         config={config} 
         cart={cart} 
         remove={remove} 
         update={update} 
         total={total} 
         discountedTotal={discountedTotal} 
      />
      }
      {size && size.width < 768 &&
      <MobileTable 
         config={config} 
         cart={cart} 
         remove={remove} 
         update={update} 
         total={total} 
         discountedTotal={discountedTotal} 
      />
      }

   <style jsx>{`
   `}</style>
   </>
   )
}

export default CartTable
