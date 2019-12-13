import App from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../components/nav';
import Footer from '../components/footer';
import Promotion from '../components/promotion';

import config from '../config';

export default class MyApp extends App {
   render() {
     const { Component, pageProps } = this.props
     return (
       <>
         <Head>
            <title>{config.title}</title>
            <link rel="icon" href="/favicon.ico" />
            <style>{`@import url(https://use.fontawesome.com/releases/v5.6.3/css/all.css)`}</style>
         </Head>
         {config.promotion && <Promotion config={config} />}
         <Nav config={config}/>
         <Component {...pageProps} config={config}/>
         <Footer config={config}/>
       </>
     )
   }
 }
