import React from 'react'

const Promotion = ({config}) => {
   return (
      <div className="promotion">
         {config.promotion.text}
         <style jsx>{`
            .promotion {
            text-transform: uppercase;
            padding: 10px 0px 10px;
            font-weight: 600;
            text-align: center;
            color: ${config.promotion.color};
            background-color: ${config.theme.color};
            }
         `}</style>
      </div>
   );
}

export default Promotion;