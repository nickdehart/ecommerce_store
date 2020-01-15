
const ReviewMobileTable = ({dataObj, items, getStars}) => {
   
   return (
      <>
         <table className="table">
            <tbody>
               {items.map((item, index) => {
                  if(dataObj[0].reviews[item])
                  {
                     return (
                     <tr key={`review-row-${index}`}>
                        <td colSpan={dataObj[0].reviews[item].images[0] ? 1 : 2}>
                           <p className="username-mobile">{dataObj[0].reviews[item].username}</p>
                           <p className="date-mobile">{new Date(dataObj[0].reviews[item].date).toLocaleDateString()}</p>
                           <div className="star-container-mobile">
                              {getStars(dataObj[0].reviews[item].rating)}
                           </div>
                           <p>{dataObj[0].reviews[item].text}</p>
                        </td>
                        {dataObj[0].reviews[item].images[0] &&
                           <td colSpan={1}>
                              <img src={dataObj[0].reviews[item].images[0]} className="img-max-mobile" />
                           </td>
                        }
                     </tr>
                     )
                  }
               })
               }
            </tbody>
         </table>
        
         <style jsx>{`
            .date-mobile {
               margin: 5px auto 5px;
               font-size: .9rem;
               color: #999
            }
            .img-max-mobile {
               max-width: 100px;
            }
            .star-container-mobile {
               margin-top: 5px;
               min-width: 130px;
            }
            .star-container-mobile small {
               font-weight: 600;
               margin-right: 10px;
            }
            .username-mobile {
               font-weight: 600;
               margin: 5px auto 5px;
            }
         `}</style>
      </>
   );
}

export default ReviewMobileTable;
