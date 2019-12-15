import { FormControl, InputGroup, Alert } from 'react-bootstrap'
import Button from '../components/button'

const handleSubmit = (e, setShow) => {
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
        if(response.status === 200)
           setShow(1)
        else
           setShow(-1)
     })
     .catch(error => console.log(error))
}

const Home = ({config}) => {
  const [show, setShow] = React.useState(0);

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
              <Alert show={show === 1} variant="success">
               Success! Thank you for subscribing!
              </Alert>
              <Alert show={show === -1} variant="danger">
                Failure! Something went wrong. Please refresh and try again.
              </Alert>
              <form onSubmit={(e) => handleSubmit(e, setShow)} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-6 mx-auto">
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Email Address"
                    name="email"
                    type="email"
                  />
                  <InputGroup.Append>
                    <button className="sub-button" type="submit">Subscribe</button>
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
      `}</style>
    </>
  )
}

export default Home
