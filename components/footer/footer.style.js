import css from 'styled-jsx/css'
import config from '../../config'

export default css`
:global(body) {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
    Helvetica, sans-serif;
}
nav {
  text-align: center;
  padding: 10px 0px 10px;
  background-color: #f5f5f5;
}
ul {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
nav > ul {
  padding: 4px 16px;
}
li {
  display: flex;
  padding: 6px 8px;
}
.pill-footer {
  color: #7a7a8c;
  text-decoration: none;
  font-size: .75rem;
  text-transform: uppercase;
  font-weight: 700;
  white-space: nowrap;
  border: 1px solid #28242f;
  border-radius: 2rem;
  padding: .2rem .85rem .25rem;
}
.pill-footer:hover {
   background: ${config.theme.color};
   color: #fff;
}
.payment-icon {
   font-size: x-large;
}
.copyright {
   font-size: small;
   text-decoration: none;
   color: #000;
}
`