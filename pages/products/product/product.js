import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

import PaypalButton from '../../../components/paypal';
import Button from '../../../components/button/button';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  addToCart = (e, product) => {
    e.preventDefault();
    const { cartCount, setCartCount } = this.props;
    let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
    product.quantity = parseInt(e.target.quantity.value);

    if(!cart){
      cart = [];
    }

    for(var i = 0; i < cart.length; i++){
      if(product.name === cart[i].name){
        cart[i].quantity += product.quantity
        setCartCount(cart[i].quantity)
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
        return
      }
    }

    setCartCount(cartCount + product.quantity)
    cart.push({
      name: product.name,
      number: product.number,
      quantity: product.quantity
    })
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
  }

  static getInitialProps({query}){
    return {query}
  }

  render() {
    const { config, query } = this.props;
    const { activeIndex } = this.state;

    let product;
    for(var i = 0; i < config.products.length; i++){
      if(config.products[i].name.toLowerCase().replace(/[^A-Z0-9]/gi, '_') === query.id){
        product = config.products[i];
        product.number = i;
        break;
      }
    }

    let stars = [];
    for(var i = 0; i < 5; i++) {
      stars.push(<i className="fas fa-star" 
                    style={{color: config.theme.color}}
                    key={`star-${i}`}></i>)
    }

  return (
    <>
      <div className="container product">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-3" >
          <img className="selected-img" src={`${product.assets}${product.images[activeIndex]}`}></img>
          <div className="thumbnail-container">
            {product.images.map((item, index) => {
              return(
                <img 
                  key={`thumbnail-${index}`} 
                  src={`${product.assets}${item}`} 
                  onClick={() => this.setState({ activeIndex: index })}
                  className={`mx-2 p-2 thumbnail-img ${activeIndex === index && 'thumbnail-selected'}`} 
                />
              )
            })}
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-3">
          <h1>{product.name}</h1>
          <div>{stars}&nbsp;(112)</div>
          <p className="price mt-2">{product.multiplier && <s>{`$${Math.floor(product.price * product.multiplier)}.99`}</s>}${product.price}</p>
          <p>{product.description}</p>
          <Form onSubmit={(e) => this.addToCart(e, product)} role="form">
            <FormGroup className="mb-3">
              <FormLabel>Quantity:</FormLabel>
              <FormControl
                className="col-3"
                name="quantity"
                type="number"
                defaultValue={1}
                min={1}
              />
              <Button variant="button" fullWidth={true}>Add To Cart</Button>
              <PaypalButton
                commit={true}
                currency={'USD'}
                total={100}
              />
            </FormGroup>
          </Form>
          <div className="table-responsive">
            <h4><b>Buy More, Pay Less!</b></h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Line Item Quantity</th>
                  <th scope="col">Discount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        s {
          color: #333;
          margin: 0px 15px 0px 0px;
        }
        .price {
          font-weight: 600;
          font-size: 1.25em;
          color: ${product.multiplier ? 'red' : '#333'};
        }
        .product {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
        }
        .selected-img {
          width: 100%;
        }
        .thumbnail-img {
          width: 110px;
        }
        .thumbnail-img:hover {
          cursor: pointer;
        }
        .thumbnail-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
        }
        .thumbnail-selected {
          border: 2px solid ${config.theme.color};
          border-radius: 5px;
        }
      `}</style>
    </>
  )
}
}

export default Product
