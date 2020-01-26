import Router from 'next/router';

// import PaypalButton from '../../../components/paypal';
import Button from '../../components/button/button';
import Review from '../../components/review';
import Pixel from '../../components/pixel';
import Guarantees from '../../components/guarantees/guarantees';
import Description from '../../components/description/description';
import NotFound from '../../components/notFound';

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      reviews: [],
      meta: [],
      quantity: 1,
      query: {}
    };
  }

  componentDidMount() {
    const query = Router.query
    this.setState({query: query})
    fetch(`/api/review?id=${query.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({reviews: data})
      })
      .catch(error => console.error(error))
    fetch(`/api/review/meta`)
      .then(response => response.json())
      .then(data => {
        for(var i = 0; i < data.length; i++){
          if(data[i]._id === query.id)
            this.setState({meta: [data[i]]})
        }
      })
      .catch(error => console.error(error))
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
      if(product.id === cart[i].id){
        cart[i].quantity += product.quantity
        setCartCount(cart[i].quantity)
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
        Router.push('/cart');
        return
      }
    }

    setCartCount(cartCount + product.quantity)
    cart.push({
      id: product.id,
      number: product.number,
      quantity: product.quantity
    })
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart))
    Router.push('/cart');
  }

  changeQuantity = (e) => {
    this.setState({quantity: +e.target.value})
  }

  render() {
    const { config } = this.props;
    const { activeIndex, reviews, meta, quantity, query } = this.state;

    let product;
    for(var i = 0; i < config.products.length; i++){
      if(config.products[i].id === query.id){
        product = config.products[i];
        product.number = i;
        break;
      }
    }

    let stars = [];
    if(meta.length > 0) {
      for(var i = 0; i < Math.round(meta[0].avg); i++) {
      stars.push(<i className="fas fa-star" 
                    style={{color: config.theme.color}}
                    key={`star-${i}`}></i>)
      }
    }

  return (
    product ? 
    <>
      <Pixel name={product.name ? product.name : 'FACEBOOK_PIXEL_1'} />
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
          {meta.length > 0 && <div>{stars}&nbsp;{`(${meta[0].count})`}</div>}
          <p className="price mt-2">{product.multiplier && <s>{`$${Math.floor(product.price * product.multiplier)}.99`}</s>}${product.price}</p>
          <p>{product.description}</p>
          <form onSubmit={(e) => this.addToCart(e, product)}>
            <div className="form-group mb-3">
              <label>Quantity:</label>
              <input
                className="form-control col-3"
                name="quantity"
                id='quantifier'
                type="number"
                defaultValue={1}
                min={1}
                onChange={this.changeQuantity}
              />
              <Button variant="button" fullWidth>Add To Cart</Button>
              {/* <PaypalButton
                cart={[{
                  name: product.name,
                  number: product.number,
                  quantity: quantity,
                }]}
                commit={true}
                currency={'USD'}
                total={product.price * quantity}
              /> */}
            </div>
          </form>
          <Guarantees />
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
      {product.demo && 
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mx-auto my-3">
          <img 
            src={`${product.assets}${product.demo}`} 
            className="rounded mx-auto d-block"
            style={{maxWidth: '100%'}}
            />
        </div>
      }
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {product.details && product.details.map((detail, index) => 
        <Description config={config} detail={detail} key={`description-detail-${index}`}/>
      )}
      </div>
      <Review config={config} data={reviews} dataExists={false} product={product}/>

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
    :
    <NotFound />
  )
}
}

export default Product
