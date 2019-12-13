import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

import PaypalButton from '../../../components/paypal';
import Button from '../../../components/button/button';

const CLIENT = {
  sandbox: 'xxxXXX',
  production: 'xxxXXX',
};
const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
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
        break;
      }
    }

    let stars = [];
    for(var i = 0; i < 5; i++) {
      stars.push(<i className="fas fa-star" 
                    style={{color: config.theme.color}}
                    key={`star-${i}`}></i>)
    }

    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);
    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

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
          <p className="price"><s>{`$${Math.floor(product.price * 2.5)}.99`}</s>${product.price}</p>
          <p>{product.description}</p>
          <Form onSubmit={() => {event.preventDefault(); console.log('trying to submit')}} role="form">
            <FormGroup className="mb-3">
              <FormLabel>Quantity:</FormLabel>
              <FormControl
                className="col-3"
                name="search"
                type="number"
                defaultValue={1}
                min={1}
              />
              <Button variant="button" fullWidth={true}>Add To Cart</Button>
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
            </FormGroup>
          </Form>
        </div>
      </div>

      <style jsx>{`
        s {
          color: black;
          margin: 0px 15px 0px 0px;
        }
        .price {
          font-weight: 600;
          font-size: 1.25em;
          color: red;
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
