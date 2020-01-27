import React from 'react'
import Link from 'next/link';
import style from './footer.style'

const Footer = ({config}) => (
  <nav className="mt-4">
    <ul>
      {config.footer.links.map(({ href, label }, index) => (
        <li key={`footer-link-${index}`}>
          <Link href={href}><a className="pill-footer">{label}</a></Link>
        </li>
      ))}
    </ul>
    <div>
      <Link href="/legal">
        <a className="copyright">&copy; {new Date().getFullYear()}, {config.title}</a>
      </Link>
    </div>
    <ul>
       <li><i className="fab fa-cc-amex payment-icon"></i></li>
       <li><i className="fab fa-apple-pay payment-icon"></i></li>
       {/* <li><i className="fab fa-cc-diners-club payment-icon"></i></li> */}
       <li><i className="fab fa-cc-discover payment-icon"></i></li>
       <li><i className="fab fa-cc-jcb payment-icon"></i></li>
       <li><i className="fab fa-cc-mastercard payment-icon"></i></li>
       <li><i className="fab fa-cc-paypal payment-icon"></i></li>
       <li><i className="fab fa-cc-visa payment-icon"></i></li>
    </ul>

    <style jsx>
      {style}
    </style>
  </nav>
)

export default Footer
