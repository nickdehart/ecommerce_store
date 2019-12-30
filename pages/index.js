import { FormControl, InputGroup } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Button from '../components/button'

const Home = ({config}) => {

  const [disable, setDisable] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/subscribe', {
       method: 'POST',
       headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
       }, 
       body: JSON.stringify({
            email: e.target.email.value,
            date: new Date()
          })
       })
       .then(response => {
          if(response.status === 200){
            Swal.fire(
              'Success!',
              'Thank you for subscribing.',
              'success'
            )
            setDisable(true)
          } else
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Please refresh and try again.'
            })
       })
       .catch(error => console.error(error))
  }

  return (
    <>
      {config.home.promo &&
        <div className="banner">
          <p className="promo">{config.home.promo}</p>
          {config.home.reason && <p className="promo-sub">{config.home.reason}</p>}
          <p className="promo-sub">IN EFFECT NOW!</p>
          <Button href="/products">Shop Now</Button>
        </div>
      }
      <div className="container">
          {config.home.showSubscribe &&
            <div className="subscribe">
              <p className="sub-header">
                Subscribe to our newsletter
              </p>
              <p style={{textAlign: 'center'}}>Sign up to our newsletter for promotions and savings!</p>
              <form onSubmit={handleSubmit} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-6 mx-auto">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    required
                  />
                  <InputGroup.Append>
                    <button className="sub-button" type="submit" disabled={disable}>Subscribe</button>
                  </InputGroup.Append>
                </InputGroup>
              </form>
            </div>
          }
      </div>

      <style jsx>{`
        .banner {
          height: 50vh;
          background-image: url(${config.home.banner});
          background-position: center;
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center
        }
        .promo {
          font-size: 3em;
          margin-bottom: 8px;
          color: white;
          text-transform: uppercase;
          font-weight: 600;
          text-align: center;
        }
        .promo-sub {
          font-size: 1.5em;
          margin-bottom: 20px;
          color: white;
          text-transform: uppercase;
          font-weight: 600;
        }
        .subscribe {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .sub-header {
          font-size: 1.25em;
          margin-bottom: 20px;
          color: black;
          text-transform: uppercase;
          font-weight: 600;
        }
        .sub-button {
          color: white;
          background: ${config.theme.color};
          font-size: small;
          font-weight: 600;
          text-transform: uppercase;
          border: 0px;
        }
        .sub-button:disabled {
          background: #dddddd
        }
      `}</style>
    </>
  )
}

export default Home
