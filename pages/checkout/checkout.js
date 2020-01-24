import Button from '../../components/button'
import Guarantees from '../../components/guarantees/guarantees';
import Square from '../../components/square/square';
import AddressForm from '../../components/addressForm';
import Stepper from '../../components/stepper';

import Swal from 'sweetalert2'
import convert from 'xml-js';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      discountedTotal: 0,
      summaryExpanded: true,
      checkedAddress: false,
      billingAddress: {},
      shippingAddress: {},
      step: 0,
      steps: [
         {label: 'Shipping'},
         {label: 'Billing'},
         {label: 'Payment'},
      ]
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

   handleSubmit = async (e) => {
      e.preventDefault();
      const { step, checkedAddress } = this.state;
      let input = {
         firstName: e.target.firstName.value,
         lastName: e.target.lastName.value,
         address1: e.target.address1.value,
         address2: e.target.address2.value,
         city: e.target.city.value,
         state: e.target.state.value,
         country: e.target.country.value,
         zip5: e.target.zip.value,
         zip4: '',
         email: e.target.email.value,
         phone: e.target.phone.value,
      }
      let inputValidated;
      let data;
      if(e.target.country.value === "United States"){
         let xmlAddress = `` +
            `<AddressValidateRequest USERID="151NONE07949">` +
               `<Revision>1</Revision>` +
               `<Address>` +
                  `<Address1>${input.address1}</Address1>` +
                  `<Address2>${input.address2}</Address2>` +
                  `<City>${input.city}</City>` +
                  `<State>${input.state}</State>` +
                  `<Zip5>${input.zip}</Zip5>` +
                  `<Zip4/>` +
               `</Address>` +
            `</AddressValidateRequest>`
         const response = await fetch(`https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${xmlAddress}`);
         const text = await response.text();
         data = await convert.xml2js(text, {compact: true});
         if(data.AddressValidateResponse.Address.Error){
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'That address was not found!',
               footer: 'Please check that no typos were made.'
            })
            return
         } else {
            inputValidated = {
               firstName: input.firstName,
               lastName: input.lastName,
               address1: data.AddressValidateResponse.Address.Address1 ? data.AddressValidateResponse.Address.Address1._text : '',
               address2: data.AddressValidateResponse.Address.Address2 ? data.AddressValidateResponse.Address.Address2._text : '',
               city: data.AddressValidateResponse.Address.City._text,
               state: data.AddressValidateResponse.Address.State._text,
               country: input.country,
               zip5: data.AddressValidateResponse.Address.Zip5._text,
               zip4: data.AddressValidateResponse.Address.Zip4._text,
               email: input.email,
               phone: input.phone,
            }
         }
      } 
      if(step === 0){
         this.setState({shippingAddress: inputValidated ? inputValidated : input})
         if(checkedAddress){
            this.setState({step: 1})
         } else {
            this.setState({step: 2})
         }
      } else {
         this.setState({billingAddress: inputValidated ? inputValidated : input})
         this.setState({step: 2})
      }
   }
  
  render() {
    const { config } = this.props;
    const { 
       cart, 
       total, 
       discountedTotal, 
       summaryExpanded, 
       checkedAddress, 
       shippingAddress,
       billingAddress,
       steps, 
       step } = this.state;
    let estimatedTax = parseFloat((discountedTotal * .075).toFixed(2))
    if((shippingAddress.state && shippingAddress.state !== "FL") || 
       (billingAddress.state && billingAddress.state !== "FL")){
       estimatedTax = 0
    }

    return (
    <>
      <div className="container my-4">
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
                     <th colSpan={2} className="header">
                        <button className="head-btn" onClick={() => this.setState({summaryExpanded: !summaryExpanded})}>
                           <i className="fas fa-shopping-cart fa-lg"></i>
                           &nbsp;&nbsp;
                           {summaryExpanded ? 'Hide order summary' : 'Show order summary'}
                           &nbsp;&nbsp;
                           {summaryExpanded ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                        </button>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {summaryExpanded &&
                  <>
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
                  </>
                  }
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
         {step === 0 && 
         <>
            <div className="addressQuestion mx-auto my-3" onClick={() => this.setState({checkedAddress: !checkedAddress})}>
               <span>
                  {
                     checkedAddress ? <i className="fas fa-check-square" />
                     :
                     <i className="far fa-square" />
                  }
               </span>
               Billing address different than Shipping?
            </div>
            <AddressForm config={config} text={`Continue to ${checkedAddress ? "Billing" : "Payment"}`} handleSubmit={this.handleSubmit} />
         </>
         }
         {step === 1 &&
            <AddressForm config={config} text={`Continue to Payment`} handleSubmit={this.handleSubmit} />
         }
         {step === 2 && 
         <>
            <table className="table table-width mx-auto my-3">
               <tbody>
                  <tr><td>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</td></tr>
                  <tr><td>{shippingAddress.address1 ? shippingAddress.address1 : shippingAddress.address2}</td></tr>
                  <tr className="address2"><td>{shippingAddress.address2}</td></tr>
                  <tr><td>{`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip5}`}</td></tr>
               </tbody>
            </table>
            <Square total={parseFloat((discountedTotal + estimatedTax).toFixed(2))}/> 
         </>
         }
         <Stepper config={config} steps={steps} currentStep={step} />
      </div>

      <style jsx>{`
      .address2{
         display: ${(shippingAddress.address2 && shippingAddress.address1) ? 'initial' : 'none'};
      }
      .addressQuestion {
         max-width: 400px;
         color: #6c757d;
         display: flex;
         justify-content: center;
         align-items: center;
      }
      .addressQuestion :hover{
         cursor: pointer;
      }
      .addressQuestion span {
         margin: 10px;
      }
      .cart-content {
        width: 100%;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .header{
         border-top: none;
         font-weight: 500;
      }
      .head-btn{
         width: 100%;
         padding: 10px;
         text-align: left;
         border: none;
         background-color: transparent;
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

export default Checkout
