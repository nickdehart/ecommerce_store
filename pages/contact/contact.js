import { Alert } from 'react-bootstrap'
import Button from '../../components/button'

const handleSubmit = (e, setShow) => {
   e.preventDefault();
   fetch('/api/contact', {
      method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
           name: e.target.name.value,
           email: e.target.email.value,
           phone: e.target.phone.value,
           message: e.target.message.value,
           date: new Date()
         })
      })
      .then(response => {
         if(response.status === 200)
            setShow(1)
         else
            setShow(-1)
      })
      .catch(error => console.log(error))
}

const Contact = ({config}) => {
   const [show, setShow] = React.useState(0);

   return (
   <>
      <div className="container">
         <h1 className="title">Contact Us</h1>
         <p className="description">
            If you have a question about an order already placed, please include your order number in the message.
         </p>
         
         <form onSubmit={(e) => handleSubmit(e, setShow)}>
            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <label htmlFor="nameInput">Name<span>*</span></label>
                  <input type="text" name="name" className="form-control" id="nameInput" placeholder="John Doe" required/>
               </div>
               <div className="form-group col-12 col-md-6">
                  <label htmlFor="emailInput">Email address<span>*</span></label>
                  <input type="email" name="email" className="form-control" id="emailInput" placeholder="name@example.com" required/>
               </div>
            </div>
            <div className="form-group">
               <label htmlFor="phoneInput">Phone Number</label>
               <input type="tel" name="phone" pattern="[0-9]{10}" className="form-control" id="phoneInput" placeholder="0123456789" />
            </div>
            <div className="form-group">
               <label htmlFor="textInput">Message<span>*</span></label>
               <textarea className="form-control" name="message" id="textInput" rows="10" required></textarea>
            </div>
            <Alert show={show === 1} variant="success">
               Success! Thank you for reaching out. We will follow up with you as quickly as we can.
            </Alert>
            <Alert show={show === -1} variant="danger">
               Failure! Something went wrong. Please refresh and try again.
            </Alert>
            <Button variant="button" disabled={show === 1}>Send</Button>
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
         span {
            color: red;
         }
      `}</style>
   </>
   )
}

export default Contact
