import Button from '../../components/button'
import Guarantees from '../../components/guarantees/guarantees';
import Square from '../../components/square/square';

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      discountedTotal: 0
    };
  }

  componentDidMount() {
    const { cartCount } = this.props;
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
    let estimatedTax = parseFloat((discountedTotal * .075).toFixed(2))

    return (
    <>
      <div className="container my-5">
            {cart.length === 0 ?
            <div className="cart-content">
               <p>Your cart is currently empty.</p>
               <div>
                  <Button href="/products">Continue Shopping</Button>
               </div>
            </div>
            :
            <table className="table table-width mx-auto">
               <thead>
                  <tr>
                     <th colSpan={2} className="header"><h4>Order Summary</h4></th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Items:</td>
                     <td className="num">
                        ${total.toFixed(2)}
                     </td>
                  </tr>
                  <tr>
                     <td>Discounts:</td>
                     <td className="num">
                        ${(total - discountedTotal).toFixed(2)}
                     </td>
                  </tr>
                  <tr>
                     <td>Shipping & Handling:</td>
                     <td className="num">
                        $0.00
                     </td>
                  </tr>
                  <tr>
                     <td>Total before tax:</td>
                     <td className="num">
                        ${discountedTotal.toFixed(2)}
                     </td>
                  </tr>
                  <tr>
                     <td>
                        Estimated tax to be collected:
                     </td>
                     <td className="num">
                        ${estimatedTax.toFixed(2)}
                     </td>
                  </tr>
                  <tr>
                     <td className="total">
                        Order total:
                     </td>
                     <td className="total num">
                        ${(discountedTotal + estimatedTax).toFixed(2)}
                     </td>
                  </tr>
               </tbody>
            </table>
            }
         <Guarantees />
         <div className="container table-width">
            <h1 className="title">Billing & Shipping</h1>
            <p className="description">
               If you have a question about an order already placed, please include your order number in the message.
            </p>
            
            <form onSubmit={(e) => handleSubmit(e, setShow)}>
               <div className="row">
                  <div className="form-group col-12 col-md-6">
                     <label htmlFor="nameInput">Name<span>*</span></label>
                     <input type="text" name="name" className="form-control" id="nameInput" placeholder="John Doe" required/>
                  </div>
                  <div className="form-group col-12 col-md-6">
                     <label htmlFor="emailInput">Email address<span>*</span></label>
                     <input type="email" name="email" className="form-control" id="emailInput" placeholder="name@example.com" required/>
                  </div>
               </div>
               <div className="form-group">
                  <label htmlFor="phoneInput">Phone Number</label>
                  <input type="tel" name="phone" pattern="[0-9]{10}" className="form-control" id="phoneInput" placeholder="0123456789" />
               </div>
               <div className="form-group">
                  <label htmlFor="textInput">Message<span>*</span></label>
                  <textarea className="form-control" name="message" id="textInput" rows="10" required></textarea>
               </div>
               <Button variant="button">Send</Button>
            </form>
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
      .header{
         text-align: center;
         border-top: none;
      }
      .num{
         text-align: right;
      }
      .table-width{
         max-width: 700px;
      }
      .total{
         color: #B12704;
         font-weight: 700;
         font-size: 17px;
      }
      `}</style>
    </>
    )
  }
}

export default Billing
