import Button from '../../components/button'

const Cart = ({config}) => (
  <>
    <div className="cart-content">
      <p>Your cart is currently empty.</p>
      <div>
      <Button href="/products">Continue Shopping</Button>
      </div>
    </div>

    <style jsx>{`
    .cart-content {
       width: 100%;
       min-height: 60vh;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
    }
    `}</style>
  </>
)

export default Cart
