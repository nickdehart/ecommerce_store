import App from 'next/app'
import Head from 'next/head'
import Router from "next/router";
import withGA from "next-ga";
// import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../components/nav';
import Footer from '../components/footer';
import Promotion from '../components/promotion';

import config from '../config';

class MyApp extends App {
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
     const { Component } = this.props
     const { cartCount } = this.state
     return (
       <>
         <Head>
            <title>{config.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"></link>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
            <meta name="description" content="Free Shipping on All Orders. Online Home Store for Decor, Gadgets Outdoors and More. Shop myBetterHomeGoods for an ever-changing selection of amazing finds at incredible savings."></meta>
         </Head>
         {config.promotion && <Promotion config={config} />}
         <Nav config={config} cartCount={cartCount}/>
         <Component config={config} setCartCount={this.setCartCount} cartCount={cartCount} />
         <Footer config={config}/>
       </>
     )
   }
 }

export default withGA("UA-157025431-1", Router)(MyApp);