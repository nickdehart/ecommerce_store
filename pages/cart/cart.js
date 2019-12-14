import Button from '../../components/button'
import PaypalButton from '../../components/paypal';

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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  return (
                  <tr key={`cart-item-${index}`}>
                    <td style={{display: 'flex', flexWrap: 'wrap'}}>
                      <img src={`${item.assets}${item.images[0]}`} className="img-fluid"/>
                      <h5>{item.name}</h5>
                    </td>
                    <td><p>${item.price}</p></td>
                    <td><p>{item.quantity}</p></td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>

                  </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-4">
                <Button variant="button" fullWidth={true}>Check Out</Button>
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
