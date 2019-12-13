import { Form, FormControl, InputGroup, Button } from 'react-bootstrap'

import ProductCard from '../../components/productCard'

const Products = ({config}) => {
  const [phrase, setPhrase] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setPhrase(event.target.search.value)
  }

  return (
    <>
      <div className="hero">
        <div className="container col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 my-4 mx-auto">
          <Form onSubmit={handleSubmit} role="form">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search..."
                name="search"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit"><i className="fas fa-search"></i></Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
        <div className="container items">
        {config.products.filter(product => product.name.toUpperCase().includes(phrase.toUpperCase()))
        .map((item, index) => {
          return (<ProductCard key={`product-${index}`} item={item}/>)
        })}
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding: 40px 0 20px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .items {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      `}</style>
    </>
  )
}

export default Products
