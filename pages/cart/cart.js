import Head from 'next/head'

import Button from '../../components/button'
// import PaypalButton from '../../components/paypal';
import CartTable from '../../components/cartTable';
import Guarantees from '../../components/guarantees/guarantees';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      discountedTotal: 0,
      pixelData: {}
    };
  }

  componentDidMount() {
    const { config, cartCount } = this.props;
    if(cartCount > 0){
      let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
      this.setState({cart: cart ? cart : []})
      this.calculateTotals(cart)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartCount !== prevProps.cartCount) {
      let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
      this.setState({cart: cart ? cart : []})
      this.calculateTotals(cart)
    }
  }

  removeCartItem = (item) => {
    const { cartCount, setCartCount } = this.props;
    let newCartCount = cartCount - item.quantity;
    setCartCount(newCartCount)

    let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
    if(!cart){
      cart = []
    }
    cart = cart.filter((product) => {
      return product.id !== item.id;
    })
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
  }

  updateCartQuantity = (event, item) => {
    event.preventDefault();
    const { cartCount, setCartCount } = this.props;
    let newQuantity = +event.target.quantity.value;

    if(newQuantity !== item.quantity && newQuantity > 0){

      let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
      if(!cart){
        cart = []
      }
      for(var i = 0; i < cart.length; i++){
        if(cart[i].id === item.id){
          let oldCartCount = cartCount - cart[i].quantity
          let newCartCount = oldCartCount + newQuantity;
          setCartCount(newCartCount)

          cart[i].quantity = newQuantity;
          sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
          return
        }
      }
    }
  }

  calculateTotals = (cart) => {
    const { config } = this.props;
    
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
    this.setState({total: total, discountedTotal: discountedTotal})
  }
  
  render() {
    const { config } = this.props;
    const { cart, total, discountedTotal } = this.state;

    return (
    <>
      <Head>
        <title>{`${config.title} - Shopping Cart`}</title>
        <meta name="description" content={`${config.title} - Shopping Cart`}></meta>
      </Head>
      {cart.length === 0 ?
        <div className="cart-content">
          <p>Your cart is currently empty.</p>
          <div>
          <Button href="/products">Continue Shopping</Button>
          </div>
        </div>
        :
        <div className="container my-5">
          <CartTable 
            cart={cart} 
            config={config} 
            remove={this.removeCartItem}
            update={this.updateCartQuantity}
            total={total}
            discountedTotal={discountedTotal}
          />
          <Guarantees />
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-4 mx-auto" >
            <Button href="/checkout" fullWidth>Check Out</Button>
            <Button href="/products" fullWidth invert>Keep Shopping</Button>
            {/* <PaypalButton
              cart={cart}
              commit={true}
              currency={'USD'}
              total={discountedTotal}
            /> */}
          </div>

        </div>
      }

      <style jsx>{`
      .cart-content {
        width: 100%;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .checkout-btn {
        display: flex; 
        justify-content: center;
        width: 100%;
        background-color: ${config.theme.color};
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 16px;
        font-weight: 600;
        white-space: nowrap;
        border: 2px solid transparent;
        border-radius: 4px;
        margin: 17px auto 17px;
        padding: 14px 0px 14px
      }
      `}</style>
    </>
    )
  }
}

export default Cart
