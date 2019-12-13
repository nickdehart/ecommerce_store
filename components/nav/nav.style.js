import css from 'styled-jsx/css'
import config from '../../config'

export default css`
:global(body) {
  margin: 0;
  font-family: -apple-system, Work Sans, BlinkMacSystemFont, Avenir Next, Avenir,
    Helvetica, sans-serif;
}
.right {
  text-align: right;
  padding-top: 5px;

}
.middle {
  text-align: center;
  padding-top: 5px;
  text-decoration: none;
  color: #000;
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
.cart .cart-icn {
  font-size: x-large;
  text-decoration: none;
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
  margin: 20px 0px 0px;
  border-bottom: 1px solid #e8e9eb;
}
.a-logo {
  color: #000;
  text-decoration: none;
}
.a-link {
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 550;
  border-bottom: 1px solid transparent;
}
.a-link:hover {
  border-bottom: 1px solid #000;
}
`