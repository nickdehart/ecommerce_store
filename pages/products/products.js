import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'

import ProductCard from '../../components/productCard'

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: '',
      reviewMeta: []
    };
  }

  componentDidMount() {
    fetch(`/api/review/meta`)
      .then(response => response.json())
      .then(reviewMeta => {
        this.setState({reviewMeta: reviewMeta})
      })
      .catch(error => console.error(error))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({phrase: event.target.search.value})
  }

  render() {
    const { config } = this.props;
    const { phrase, reviewMeta } = this.state;

    return (
      <>
        <div className="container col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 my-4 mx-auto">
          <form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search..."
                name="search"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit"><i className="fas fa-search"></i></Button>
                {
                  phrase !== '' &&
                  <Button variant="outline-danger" onClick={() => this.setState({phrase: ''})}><i className="fas fa-times"></i></Button>
                }
              </InputGroup.Append>
              
            </InputGroup>
          </form>
        </div>
        <div className="container items">
        {config.products.filter(product => product.name.toUpperCase().includes(phrase.toUpperCase()))
          .map((item, index) => {
            let meta = {avg: 0}
            for(var i = 0; i < reviewMeta.length; i++)
              if(reviewMeta[i]._id === item.id)
                meta = reviewMeta[i]
            return (<ProductCard key={`product-${index}`} item={item} config={config} meta={meta}/>)
          })
        }
        </div>

        <style jsx>{`
          .items {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
        `}</style>
      </>
    )
  }
}

export default Products
