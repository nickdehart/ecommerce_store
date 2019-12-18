// 1. Set up your server to make calls to PayPal
import config from '../../../config'
// 1a. Import the SDK package
const paypal = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('./payPalClient');

// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {

  // 3. Call PayPal to set up a transaction
  let total = 0
  let items = []
  for(var i = 0; i < req.body.cart.length; i++){
    let product = {}
    for(var k = 0; k < config.products.length; k++){
      if(req.body.cart[i].name === config.products[k].name){
        product = config.products[k]
        break
      }
    }

    let price = product.price;
    switch(req.body.cart[i].quantity){
      case 1:
          total += price;
          break;
      case 2:
          price = parseFloat((price - (price * .1)).toFixed(2))
          total += price * 2;
          break;
      case 3:
          price = parseFloat((price - (price * .15)).toFixed(2))
          total += price * 3;
          break;
      default:
          price = parseFloat((price - (price * .2)).toFixed(2))
          total += price * req.body.cart[i].quantity;
          break;
    }

    items.push({
      name: product.name,
      description: product.description,
      sku: '' + req.body.cart[i].number,
      unit_amount: {
        currency_code: 'USD',
        value: '' + price,
      },
      // tax: {
      //   currency_code: 'USD',
      //   value: '0.01',
      // },
      quantity: '' + req.body.cart[i].quantity,
      category: 'PHYSICAL_GOODS'
    })
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '' + total,
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: '' + total,
          },
          // shipping: {
          //   currency_code: 'USD',
          //   value: '0.00',
          // },
          // handling: {
          //   currency_code: 'USD',
          //   value: '0.00',
          // },
          // tax_total: {
          //   currency_code: 'USD',
          //   value: '0.01',
          // },
          // insurance: {
          //   currency_code: 'USD',
          //   value: '0.00',
          // },
          // shipping_discount: {
          //   currency_code: 'USD',
          //   value: '0.00',
          // },
          // discount: {
          //   currency_code: 'USD',
          //   value: '0.00',
          // }
        }
      },
      items: items,
      // shipping: {
      //   method: "United States Postal Service",
      //   address: {
      //     name: {
      //       full_name:"John",
      //       surname:"Doe"
      //     },
      //     address_line_1: "123 Townsend St",
      //     address_line_2: "Floor 6",
      //     admin_area_2: "San Francisco",
      //     admin_area_1: "CA",
      //     postal_code: "94107",
      //     country_code: "US"
      //   }
      // }
    }]
  });

  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {

    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 5. Return a successful response to the client with the order ID
  res.status(200).json({
    orderID: order.result.id
  });
}