
const ReviewDesktopTable = ({dataObj, items, getStars}) => {
   
   return (
      <>
         <table className="table">
            <tbody>
               {items.map((item, index) => {
                  if(dataObj[0].reviews[item])
                  {
                     return (
                     <tr key={`review-row-${index}`}>
                        <td style={{width: '130px'}}>
                           <div className="user-container">
                              <i className="fas fa-user"></i>
                              <p>{dataObj[0].reviews[item].username}</p>
                           </div>
                           <p className="date">{new Date(dataObj[0].reviews[item].date).toLocaleDateString()}</p>
                           <div className="star-container">
                              <small>{dataObj[0].reviews[item].rating}</small>
                              {getStars(dataObj[0].reviews[item].rating)}
                           </div>
                        </td>
                        <td>
                           <p>{dataObj[0].reviews[item].text}</p>
                        </td>
                        <td>
                           {dataObj[0].reviews[item].images[0] &&
                              <img src={dataObj[0].reviews[item].images[0]} className="img-max" />
                           }
                        </td>
                     </tr>
                     )
                  }
               })
               }
            </tbody>
         </table>
        
         <style jsx>{`
            .date {
               margin: 5px auto 5px;
               font-size: 1rem;
            }
            .img-max {
               max-width: 75px;
            }
            .star-container {
               margin-top: 5px;
               min-width: 130px;
            }
            .star-container small {
               font-weight: 600;
               margin-right: 10px;
            }
            .user-container {
               display: flex;
               justify-content: flex-begin;
               align-items: center;
            }
            .user-container i {
               font-size: xx-large;
               margin-right: 15px;
            }
            .user-container p {
               font-weight: 600;
            }
         `}</style>
      </>
   );
}

export default ReviewDesktopTable;
