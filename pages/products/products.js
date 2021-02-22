import Head from "next/head";
import React from "react";
import ProductCard from "../../components/productCard";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: "",
      reviewMeta: []
    };
  }

  componentDidMount() {
    fetch(`/api/review/meta`)
      .then(response => response.json())
      .then(reviewMeta => {
        this.setState({ reviewMeta: reviewMeta });
      })
      .catch(error => console.error(error));
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ phrase: event.target.search.value });
  };

  render() {
    const { config } = this.props;
    const { phrase, reviewMeta } = this.state;

    return (
      <>
        <Head>
          <title>{`${config.title} - Products`}</title>
          <meta
            name="description"
            content="Peruse our diverse selection of home products!"
          ></meta>
        </Head>
        <div className="container col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 my-4 mx-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                className="form-control"
                placeholder="Search..."
                name="search"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  <i className="fas fa-search"></i>
                </button>
                {phrase !== "" && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => this.setState({ phrase: "" })}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="container items">
          {config.products
            .filter(product =>
              product.name.toUpperCase().includes(phrase.toUpperCase())
            )
            .map((item, index) => {
              let meta = { avg: 0 };
              for (var i = 0; i < reviewMeta.length; i++)
                if (reviewMeta[i]._id === item.id) meta = reviewMeta[i];
              return (
                <ProductCard
                  key={`product-${index}`}
                  item={item}
                  config={config}
                  meta={meta}
                />
              );
            })}
        </div>

        <style jsx>{`
          .items {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
        `}</style>
      </>
    );
  }
}

export default Products;
