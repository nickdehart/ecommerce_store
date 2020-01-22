import SquarePaymentForm, {
   CreditCardNumberInput,
   CreditCardExpirationDateInput,
   CreditCardPostalCodeInput,
   CreditCardCVVInput,
   CreditCardSubmitButton,
   GooglePayButton,
 } from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import './square.css'

class Square extends React.Component {

   constructor(props) {
     super(props)
     this.state = {
       errorMessages: [],
     }
   }
 
   cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
     if (errors) {
       this.setState({ errorMessages: errors.map(error => error.message) })
       return
     }
 
     this.setState({ errorMessages: [] })
     alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
   }

   createPaymentRequest() {
      return {
        requestShippingAddress: true,
        requestBillingInfo: true,
        currencyCode: "USD",
        countryCode: "US",
        total: {
          label: "MERCHANT NAME",
          amount: "1",
          pending: false
        },
        lineItems: [
          {
            label: "Subtotal",
            amount: "1",
            pending: false
          }
        ]
      }
    }
 
   createVerificationDetails() {
     return {
       amount: '100.00',
       currencyCode: "USD",
       intent: "CHARGE",
       billingContact: {
         familyName: "Smith",
         givenName: "John",
         email: "jsmith@example.com",
         country: "GB",
         city: "London",
         addressLines: ["1235 Emperor's Gate"],
         postalCode: "SW7 4JA",
         phone: "020 7946 0532"
       }
     }
   }
 
   render() {
      const { total } = this.props;
      const loadingView = <div className="sq-wallet-loading"></div>
      const unavailableView = <div className="sq-wallet-unavailable">Unavailable</div>

     return (
       <div className="container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
 
         <SquarePaymentForm
           sandbox={true}
           applicationId={'sandbox-sq0idb-jN-coRrgOadSZEQsd0hU0Q'}
           createPaymentRequest={this.createPaymentRequest}
           cardNonceResponseReceived={this.cardNonceResponseReceived}
           createVerificationDetails={this.createVerificationDetails}
           locationId={'0B4C2736GW0A3'}
         >
            <fieldset>
               <div className="input-container">
                  Billing Information
               </div>
               <div className="input-container">
                  <span className="sq-label">First Name</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">Last Name</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">E-mail</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">Phone</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">Address Line 1</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">Address Line 2</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">City</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
               <div className="input-container">
                  <span className="sq-label">Country</span>
                  <input className="sq-input px-2 py-2"  />
               </div>
            </fieldset>
            <hr />
            <GooglePayButton loadingView={loadingView} unavailableView={unavailableView} />
            <fieldset className="sq-fieldset">
               <CreditCardNumberInput />
               <div className="sq-form-third">
                  <CreditCardExpirationDateInput />
               </div>

               <div className="sq-form-third">
                  <CreditCardPostalCodeInput />
               </div>

               <div className="sq-form-third">
                  <CreditCardCVVInput />
               </div>
            </fieldset>

            <CreditCardSubmitButton>
                  Pay ${total}
            </CreditCardSubmitButton>
         </SquarePaymentForm>
 
         {this.state.errorMessages.length > 0 &&
            <div className="sq-error-message">
               {this.state.errorMessages.map(errorMessage =>
                  <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
               )}
            </div>
         }
         <style jsx>{`
         .checkout-input{
            display: block;
            margin: 0;
            width: 100%;
            border: none;
            font-size: 16px;
            font-family: Helvetica Neue;
            padding: 16px;
            color: #373F4A;
            background-color: transparent;
            line-height: 24px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
         }
         .input-container{
            display: flex; 
            flex-direction: column;
            margin: 10px auto 10px
         }
         `}</style>
       </div>
     )
   }
 }

 export default Square