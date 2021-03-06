import config from '../../config'

const Guarantees = () => {
   
   return (
      <div className="guarantee-box">
         
         <div className="icon-box mx-3">
            {/* <i className="fas fa-lock fa-3x"></i> */}
            <small>Secure</small>
            <small>Checkout</small>
            <span className="fa-stack fa-2x">
               <i className="fas fa-certificate fa-stack-2x"></i>
               <i className="fab fa-expeditedssl fa-stack-1x fa-inverse"></i>
            </span>
         </div>
         <div className="icon-box mx-3">
            {/* <i className="fas fa-shipping-fast fa-3x"></i> */}
            <small>Free</small>
            <small>Shipping</small>
            <span className="fa-stack fa-2x">
               <i className="fas fa-certificate fa-stack-2x"></i>
               <i className="fas fa-shipping-fast fa-stack-1x fa-inverse"></i>
            </span>
         </div>
         <div className="icon-box mx-3">
            {/* <i className="fas fa-trophy fa-3x"></i> */}
            <small>Satisfaction</small>
            <small>Guaranteed</small>
            <span className="fa-stack fa-2x">
               <i className="fas fa-certificate fa-stack-2x gold-bg"></i>
               <i className="fas fa-handshake fa-stack-1x fa-inverse"></i>
            </span>
         </div>
        
         <style jsx>{`
            .guarantee-box {
               display: flex;
               justify-content: center;
               align-items: flex-end;
               margin: 10px auto 20px;
            }
            .icon-box {
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               color: #999;
            }
            .icon-box small {
               font-weight: 600;
            }
            .fa-certificate {
               background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
               radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
               background: #999;
               
               -webkit-background-clip: text;
	            -webkit-text-fill-color: transparent;
            }
         `}</style>
      </div>
   );
}

export default Guarantees;
