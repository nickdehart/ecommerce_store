// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    let CLIENT_ID = process.env.CLIENT_ID;
    return (
      <Html>
        <Head />
         <body>
               <script
                  src={`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID ? CLIENT_ID : 'sb' }`}>
               </script>
               <Main />
               <NextScript />
         </body>
      </Html>
    )
  }
}

export default MyDocument