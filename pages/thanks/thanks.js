import Head from 'next/head'
import Button from "../../components/button"

const Thanks = ({config, setCartCount}) => {
   React.useEffect(() => {
      sessionStorage.clear()
      sessionStorage.setItem('shoppingCart', JSON.stringify([]))
      setCartCount(0)
   }, [])
   return (
   <>
      <Head>
        <title>{`${config.title} - Thank You`}</title>
        <meta name="description" content="Thank you for your payment!"></meta>
      </Head>
      <div className="outer-container">
         <div>
            <h1>Thank You</h1>
            <h2>For Your Order</h2>
            <small>You will receive a confirmation email soon.</small>
         </div>
         <Button>Back to store</Button>
      </div>
 
     <style jsx>{`
     body { 
      margin: 0 
    }
    h1 {
      display: inline-block;
      font-weight: 500;
      vertical-align: top;
      margin: 0
    }
    h2 {
      font-weight: normal;
      line-height: inherit;
      margin: 0;
      padding: 0;
      font-size: 25px;
    }
    p {

    }
    .outer-container {
      color: #000;
      background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
      height: 70vh;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center
    }
     `}</style>
   </>
 )
}
 
 export default Thanks