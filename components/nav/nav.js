import {Link} from '../../server/routes'
import { Navbar, Nav } from 'react-bootstrap'
import style from './nav.style'

const Navibar = ({ config, cartCount }) => {

  return (
    <Navbar expand="lg" className="navi" style={{borderBottom: "1px solid #e8e9eb"}}>
      <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {config.header.links.map(({ href, label }, index) => (
                  <Link route={href} key={`navlink-${index}`}><a className="nav-link a-link">{label}</a></Link>
              ))}
            </Nav>
          </Navbar.Collapse>

          <div className="navbar-brand col-4 middle">
            <Link route="/">
              <a className="a-logo">
                {config.logo && <img src={config.logo} width="30" height="30" class="d-inline-block align-top" alt={config.title} /> }
                {config.title}
              </a>
            </Link>
          </div>

          <div className="col-4 right">
            <Link route="/cart">
              <a className="cart">
                <i className="fas fa-shopping-cart cart-icn"></i>
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </a>
            </Link>
          </div>
          
      </div>
      <style jsx>
        {style}
      </style>
    </Navbar>
  )
}

export default Navibar
