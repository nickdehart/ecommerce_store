
const categories = [
  {name: 'Winter body', src: '/item1.jpg' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', price: 110},
  {name: 'Adidas', src: '/item2.jpg' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', price: 80},
  {name: 'Vans', src: '/item3.jpg' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', price: 120},
  {name: 'White', src: '/item4.jpg' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', price: 260},
  {name: 'Cropped-sho', src: '/item5.jpg' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', price: 160},
  {name: 'Cropped-sho', src: '/item5.jpg' , description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima.', price: 160},
]

const Shop = ({config}) => (
  <>
    <div className="hero">
      <div className="container items">
      {categories.map((item, index) => {
        return (
          <div key={`category-${index}`} className="category col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
              <h1>Hello, world!</h1>
          </div>
        )
      })}
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .category {
        min-height: 300px;
        background-color: #e9ecef;
        margin: 20px;

      }
      .jumbo {
        // margin: 20px;
        height: 100%;
        width: 100%;
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
        margin-top: 20px;
      }
    `}</style>
  </>
)

export default Shop
