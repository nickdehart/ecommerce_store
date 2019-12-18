import App from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../components/nav';
import Footer from '../components/footer';
import Promotion from '../components/promotion';

import config from '../config';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0
    };
  }

   componentDidMount() {
    let cart = JSON.parse(sessionStorage.getItem('shoppingCart'))
    if(cart) {
      let count = 0;
      for(var i = 0; i < cart.length; i++){
        count += cart[i].quantity
      }
      this.setState({cartCount: count})
    } else {
      sessionStorage.setItem('shoppingCart', JSON.stringify([]))
    }
   }

   setCartCount = (num) => {
     this.setState({cartCount: +num})
   }

   render() {
     const { Component, pageProps } = this.props
     const { cartCount } = this.state
     return (
       <>
         <Head>
            <title>{config.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"></link>
            {/* <style>{`@import url(https://use.fontawesome.com/releases/v5.6.3/css/all.css)`}</style> */}
         </Head>
         {config.promotion && <Promotion config={config} />}
         <Nav config={config} cartCount={cartCount}/>
         <Component {...pageProps} config={config} setCartCount={this.setCartCount} cartCount={cartCount} />
         <Footer config={config}/>
       </>
     )
   }
 }
