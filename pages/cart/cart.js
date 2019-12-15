import Button from '../../components/button'
import PaypalButton from '../../components/paypal';
import CartTable from '../../components/cartTable';

const CLIENT = {
  sandbox: 'xxxXXX',
  production: 'xxxXXX',
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    const { cartCount } = this.props;
    if(cartCount > 0){
      let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
      this.setState({cart: cart})
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartCount !== prevProps.cartCount) {
      let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
      this.setState({cart: cart})
    }
  }
  
  render() {
    const { config } = this.props;
    const { cart } = this.state;

    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);
    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
    <>
      {cart.length === 0 ?
        <div className="cart-content">
          <p>Your cart is currently empty.</p>
          <div>
          <Button href="/products">Continue Shopping</Button>
          </div>
        </div>
        :
        <div className="container my-5">
          <CartTable cart={cart} config={config}/>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-4 mx-auto">
            {/* <Button variant="button" fullWidth={true}>Check Out</Button> */}
            <PaypalButton
              client={CLIENT}
              env={ENV}
              commit={true}
              currency={'USD'}
              total={100}
              onSuccess={onSuccess}
              onError={onError}
              onCancel={onCancel}
            />
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
      `}</style>
    </>
    )
  }
}

export default Cart
