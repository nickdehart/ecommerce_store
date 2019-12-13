import Button from '../../components/button'

const Contact = ({config}) => (
  <>
    <div className="container">
      <h1 className="title">Contact Us</h1>
      <p className="description">
         If you have a question about an order already placed, please include your order number in the message.
      </p>

      <form>
         <div className="row">
            <div className="form-group col-12 col-md-6">
               <label htmlFor="nameInput">Name</label>
               <input type="text" className="form-control" id="nameInput" placeholder="John Doe" />
            </div>
            <div className="form-group col-12 col-md-6">
               <label htmlFor="emailInput">Email address</label>
               <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
            </div>
         </div>
         <div className="form-group">
            <label htmlFor="phoneInput">Phone Number</label>
            <input type="text" className="form-control" id="phoneInput" placeholder="1235551234" />
         </div>
         <div className="form-group">
            <label htmlFor="textInput">Message</label>
            <textarea className="form-control" id="textInput" rows="10"></textarea>
         </div>
         <Button>Send</Button>
      </form>
    </div>

    <style jsx>{`
      .half {
         width: 49%;
      }
      .title {
        margin-top: 40px;
        width: 100%;
        line-height: 1.15;
        font-size: 48px;
        color: #333;
      }
      .title,
      .description {
        text-align: center;
      }
      form {
        margin: 20px 0px 40px;
      }
    `}</style>
  </>
)

export default Contact
