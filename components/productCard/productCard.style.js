import css from 'styled-jsx/css'
import config from '../../config'

export default css`
.cart-icn {
   font-size: xx-large; 
   color: ${config.theme.color};
}
.card-img-top {
  display: block;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}
.item {
   position: relative;
   box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
   min-width: 300px;
}
.item:hover {
   box-shadow: 0 2px 2px 0 ${config.theme.color}, 0 3px 1px -2px ${config.theme.color}, 0 1px 5px 0 ${config.theme.color};
   cursor: pointer;
}
`