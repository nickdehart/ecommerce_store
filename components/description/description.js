
const Description = ({config, detail}) => {
   
   return (
      <div className="container col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 description-box">

            <i className={`${detail.icon} fa-4x description-icon`}></i>
            <span className="description-title">{detail.title}</span>
            <p>{detail.text}</p>

        
         <style jsx>{`
            .description-box {
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
               text-align: center;
               margin: 10px auto 20px;
            }
            .description-title {
               font-weight: 700;
               font-size: 17px;
               line-height: 1.5;
               margin: 10px auto 10px;
            }
            .description-icon {
               color: ${config.theme.color}
            }
         `}</style>
      </div>
   );
}

export default Description;
