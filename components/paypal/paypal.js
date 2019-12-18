
const CLIENT = {
  sandbox: 'xxxXXX',
  production: 'xxxXXX',
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class PaypalButton extends React.Component {

   componentDidMount() {
      const { commit, currency, total} = this.props;
      console.log(total.toFixed(2))
      paypal.Buttons({
         createOrder: function() {
            return fetch('/api/paypal/create-transaction', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }, 
              body: JSON.stringify({
                  total: total.toFixed(2),
              })
            })
            .then((response) => {return response.json()})
            .then((data) => {return data.orderID})
            .catch(error => console.log(error))
          },
          onApprove: function(data) {
            console.log(data)
            // This function captures the funds from the transaction.
            return fetch('/api/paypal/capture-transaction', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({ orderID: data.orderID })
            })
              .then((res) => { console.log(res); return res.json() })
              .then((details) => {
                console.log(details)
                alert('Transaction approved by ' + details.payer_given_name)
              })
          }
      }).render('#paypal-button-container');
   }

   render() {

      return (
         <div id="paypal-button-container"></div>
      );
   }
}


export default PaypalButton;


// FOR SERVER SIDE INTEGRATION
// return fetch('/paypal-transaction-complete', {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json'
//   },
//   body: JSON.stringify({
//     orderID: data.orderID
//   })
// });