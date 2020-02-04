import Link from 'next/link';
import AnimateHeight from 'react-animate-height';

const Navibar = ({ config, cartCount }) => {
  const [icon, setIcon] = React.useState(true);

  return (
    <nav className="navbar navbar-expand-lg navi">
      <div className="container">

        <button className="mobile-nav nav-burger-btn" onClick={() => setIcon(!icon)}>
          {icon ?
            <i className="fas fa-bars fa-lg"></i>
          :
            <i className="fas fa-times fa-lg"></i>
          }
        </button>

        <div className="navbar-nav desktop-nav">
            {config.header.links.map(({ href, label }, index) => (
                <Link href={href} key={`navlink-${index}`}><a className="nav-link a-link">{label}</a></Link>
            ))}
        </div>

        <div className="navbar-brand mx-auto pl-3">
          <Link href="/">
            <a className="a-logo">
              {config.logo ? 
                <img src={require(`../../public${config.logo.src}`)} width={config.logo.width} height={config.logo.height} alt={config.title} /> 
                :
                config.title
              }
            </a>
          </Link>
        </div>

        <div className="ml-auto pr-3">
          <Link href="/cart">
            <a className="cart">
              <i className="fas fa-shopping-cart fa-lg"></i>
              {cartCount > 0 && <span className="badge">{+cartCount}</span>}
            </a>
          </Link>
        </div>
          
      </div>

      <AnimateHeight duration={ 500 } height={ icon ? 0 : 'auto' } >
        <div className="navbar-nav">
          {config.header.links.map(({ href, label }, index) => (
              <Link href={href} key={`navlink-${index}`} >
                <a className="nav-link a-link" onClick={() => setIcon(!icon)}>{label}</a>
              </Link>
          ))}
        </div>
      </AnimateHeight>

    <style jsx>{`
      @media (max-width: 767px){
         .desktop-nav {
            display: none;
         }
      }
      @media (min-width: 768px){
        .mobile-nav {
           display: none;
        }
      }
      :global(body) {
         margin: 0;
         font-family: -apple-system, Work Sans, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
         font-family: Roboto, Helvetica, Arial, sans-serif;
      }
      .cart {
         text-decoration: none;
         position: relative;
         display: inline-block;
         color: #000;
      }
      .cart:hover {
         color: ${config.theme.color};
      }
      .cart .badge {
         position: absolute;
         top: -10px;
         right: -18px;
         padding: 5px 8px;
         border-radius: 50%;
         background: ${config.theme.color};
         color: white;
      }
      .navi {
         text-align: center;
         border-bottom: 1px solid #e8e9eb;
      }
      .a-logo {
         color: #000;
         text-decoration: none;
      }
      .a-link {
         color: rgba(0,0,0,.5);
         text-align: left;
         text-decoration: none;
         font-size: 1rem;
         font-weight: 550;
         border-bottom: 1px solid transparent;
      }
      .a-link:hover {
         border-bottom: 1px solid #000;
      }
      .nav-burger-btn {
        min-width: 51px;
        color: rgba(0,0,0,.5);
        padding: .60rem .80rem;
        font-size: 1.25rem;
        line-height: 1;
        background-color: transparent;
        border: 1px solid rgba(0,0,0,.1);
        border-radius: .25rem;
      }
      `}</style>
    </nav>
  )
}

export default Navibar
