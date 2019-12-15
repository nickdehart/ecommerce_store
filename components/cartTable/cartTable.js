
class CartTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  render() {
    const { config, cart } = this.props;
    let discountedTotal = 0;
    let total = 0;
    for(var i = 0; i < cart.length; i++){
      total += cart[i].price;
      switch(cart[i].quantity){
        case 1:
          discountedTotal += cart[i].price;
          break;
        case 2:
          discountedTotal += parseFloat((cart[i].price - (cart[i].price * .1)).toFixed(2));
          cart[i].discount = .1;
          break;
        case 3:
          discountedTotal += parseFloat((cart[i].price - (cart[i].price * .15)).toFixed(2));
          cart[i].discount = .15;
          break;
        default:
          discountedTotal += parseFloat((cart[i].price - (cart[i].price * .2)).toFixed(2));
          cart[i].discount = .2;
          break;
      }
    }

    return (
       <>
          <table className="table desktop-table">
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
                  <td>
                    <img src={`${item.assets}${item.images[0]}`} className="img-fluid cart-img"/>
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
          <table className="table mobile-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return (
                <tr key={`cart-item-${index}`}>
                  <td style={{display: 'flex'}}>
                    <img src={`${item.assets}${item.images[0]}`} className="img-fluid cart-img mr-3"/>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <p>{item.name}</p>
                      <small>Quantity: {item.quantity}</small>
                      <div className="edit-btn">
                        Edit
                      </div>
                    </div>
                  </td>
                  <td>
                    {
                      item.quantity > 1 ? 
                        <>
                          <p><s>${(item.price).toFixed(2)}</s></p>
                          <p>${(item.price - (item.price * item.discount)).toFixed(2)}</p>
                        </>
                      :
                        <p>${item.price}</p>                  
                    }
                  </td>
                </tr>
                )
              })}
              <tr>
                <td style={{display: 'flex', justifyContent: 'space-between'}}>
                  Subtotal:
                  {total !== discountedTotal && <s>${total}</s>}
                </td>
                <td>
                  ${discountedTotal}
                </td>
              </tr>
            </tbody>
          </table>

      <style jsx>{`
      @media (max-width: 767px){
        .desktop-table {
          display: none;
        }
        .cart-img {
          max-width: 90px;
        }
        .edit-btn {
          text-transform: uppercase;
          color: white;
          background-color: ${config.theme.color};
          font-size: small;
          font-weight: 600;
          text-align: center;
          width: 80px;
          padding: 5px;
          margin: 5px 5px 5px 0px;
        }
        .edit-btn:hover {
          cursor: pointer;
        }
        s {
          color: red;
        }
        p {
          margin-bottom: 0px;
        }
      }
      @media (min-width: 768px){
        .mobile-table {
          display: none;
        }
        .cart-img {
          max-width: 200px;
        }
      }
      `}</style>
    </>
    )
  }
}

export default CartTable
