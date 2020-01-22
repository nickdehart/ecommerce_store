import Swal from 'sweetalert2'
import { PayPalButton } from "react-paypal-button-v2";

const PaypalButton = ({total, cart}) => {
  return (
    <PayPalButton
    createOrder={(data, actions) => {
      return fetch('/api/paypal/create-transaction', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            total: total.toFixed(2),
            cart: cart,
        })
      })
      .then((response) => {return response.json()})
      .then((data) => {return data.orderID})
      .catch(error => console.error(error))
    }}
    onApprove={(data) => {
      // Capture the funds from the transaction
      return fetch('/api/paypal/capture-transaction', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ orderID: data.orderID })
      })
        .then((res) => { return res.json() })
        .then((details) => {
          if(details === 200){
            Swal.fire(
              'Success!',
              'Transaction Approved.',
              'success'
            )
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Please refresh and try again.'
            })
          }
        })
        .catch(error => {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please refresh and try again.'
          })
        })
    }}
    options={{
      clientId: process.env.PAYPAL_CLIENT_ID
    }}
    style={{
      layout: 'horizontal',
      label: 'buynow',
      tagline: true
    }}
  />
  );
}

export default PaypalButton;
