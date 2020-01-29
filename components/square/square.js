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
import ReactPixel from 'react-facebook-pixel';
import Router from 'next/router';
import Swal from 'sweetalert2'

const Square = ({ config, total, billingAddress, shippingAddress, cart }) => {

  const [errorMessages, setErrorMessages] = React.useState([]);
  React.useEffect(() => {
    ReactPixel.init(config.pixel.id, {}, { autoConfig: config.pixel.autoConfig, debug: config.pixel.debug });
  }, []) 

  const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      setErrorMessages(errors.map(error => error.message))
      return
    }
    Swal.fire({
      title: 'Processing',
      html: 'Satellites are linking in outer space...',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    })
 
    setErrorMessages([])
    fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        source_id: nonce,
        verification_token: buyerVerificationToken,
        amount_money: { // amount_money = $1.00
          amount: parseInt((total * 100).toFixed(0)),
          currency: "USD"
        },
        cart: cart,
        billingAddress: billingAddress,
        shippingAddress: shippingAddress
      })
    })
    .then(response => {
      if(response && response.status === 200){
        Swal.close()
        ReactPixel.track('Purchase', {
          value: total,
          currency: 'USD',
          contents: cart ? cart.map(item => { return { id: item.id, quantity: item.quantity } }) : [],
          content_type: 'product'
        })
        Router.push('/thanks');
      } else {
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Please refresh and try again.'
        })
      }
    })
  }

  const createPaymentRequest = () => {
    return {
      requestShippingAddress: true,
      requestBillingInfo: true,
      currencyCode: "USD",
      countryCode: "US",
      total: {
        label: config.title,
        amount: total.toFixed(2),
        pending: false
      },
      lineItems: [
        {
          label: "Subtotal",
          amount: total.toFixed(2),
          pending: false
        }
      ]
    }
  }

  const createVerificationDetails = (billingAddress, total) => {
    let addressLines = [];
    if(billingAddress.address1 && billingAddress.address2){
       addressLines.push(billingAddress.address1)
       addressLines.push(billingAddress.address2)
    } else if(billingAddress.address2) {
       addressLines.push(billingAddress.address2)
    } else if(billingAddress.address1) {
      addressLines.push(billingAddress.address1)
    }
    return {
      amount: total.toFixed(2),
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: billingAddress.lastName,
        givenName: billingAddress.firstName,
        email: billingAddress.email,
        city: billingAddress.city,
        addressLines: addressLines,
        postalCode: billingAddress.zip5,
      }
    }
  }

  const loadingView = <div className="sq-wallet-loading"></div>
  const unavailableView = <div></div>

  return (
    <>
    <div className="container my-3" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SquarePaymentForm
        sandbox={true}
        applicationId={config.square.app_id}
        locationId={config.square.location_id}
        createPaymentRequest={createPaymentRequest}
        cardNonceResponseReceived={cardNonceResponseReceived}
        createVerificationDetails={() => createVerificationDetails(billingAddress, total)}
      >
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

      </div>
      {errorMessages.length > 0 &&
        <div className="container sq-error-message">
            {errorMessages.map(errorMessage =>
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            )}
        </div>
      }
      <style jsx>{`
      `}</style>
    </>
  )
 }

 export default Square