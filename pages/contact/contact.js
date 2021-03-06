import Head from 'next/head'
import Swal from 'sweetalert2'
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
         setShow(true)
         if(response.status === 200)
            Swal.fire(
               'Success!',
               'Thank you for reaching out. We will follow up with you as quickly as we can.',
               'success'
            )
         else
            Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
               footer: 'Please refresh and try again.'
            })
      })
      .catch(error => console.error(error))
}

const Contact = ({config}) => {
   const [show, setShow] = React.useState(false);

   return (
   <>
      <Head>
         <title>{`${config.title} - Contact Us`}</title>
         <meta name="description" content={`${config.title} - Contact Us`}></meta>
      </Head>
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
            <Button variant="button" disabled={show}>Send</Button>
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
