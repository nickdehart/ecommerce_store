import {Link} from '../../server/routes'
import { Navbar, Nav } from 'react-bootstrap'
import style from './nav.style'

const Navibar = ({ config, cartCount }) => {

  const [icon, setIcon] = React.useState(true);

  return (
    <Navbar expand="lg" className="navi" style={{borderBottom: "1px solid #e8e9eb"}}>
      <div className="container">
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIcon(!icon)}>
            {icon ?
              <i className="fas fa-bars" style={{fontSize: '28px', width: '25px'}}></i>
            :
              <i className="fas fa-times" style={{fontSize: '28px', width: '25px'}}></i>
            }
          </Navbar.Toggle>
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
                {config.logo ? 
                  <img src={config.logo.src} width={config.logo.width} height={config.logo.height} alt={config.title} /> 
                  :
                  config.title
                }
              </a>
            </Link>
          </div>

          <div className="col-4 right">
            <Link route="/cart">
              <a className="cart">
                <i className="fas fa-shopping-cart cart-icn"></i>
                {cartCount > 0 && <span className="badge">{+cartCount}</span>}
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
