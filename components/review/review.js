import Swal from 'sweetalert2'

const Review = ({config, data, dataExists, product}) => {
   const [page, setPage] = React.useState(0);
   const [items, setItems] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
   const [write, setWrite] = React.useState(false);
   
   const handleSubmit = (e) => {
      e.preventDefault();
      let body = {
         username: e.target.username.value,
         rating: e.target.rating.value,
         review: e.target.review.value,
         date: new Date(),
         name: product.toLowerCase(),
         stars: dataExists ? data.stars : [],
         avg: dataExists ? data.avg : 0,
         count: dataExists ? data.reviews.length : 0
      }
      fetch(`/api/review?name=${product.toLowerCase()}`)
         .then(response => response.json())
         .then(data => {
            fetch('/api/review', {
               method: `${Object.keys(data).length > 0 ? 'PUT' : 'POST'}`,
               headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
               }, 
               body: JSON.stringify({
                     username: body.username,
                     rating: body.rating,
                     review: body.review,
                     date: body.date,
                     name: body.name,
                     stars: body.stars,
                     avg: body.avg,
                     count: body.count
                  })
               })
               .then(response => {
                  setWrite(false)
                  if(response.status === 200)
                     Swal.fire(
                        'Success!',
                        'Thank you for writing a review.',
                        'success'
                     )
                  else
                     Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: 'Please refresh and try again.'
                     })
               })
               .catch(error => console.log(error))
         })
         .catch(error => console.log(error))
      
   }

   const incrementPage = (page) => {
      let newPage = page + 1;
      if((page + 1) < (data.reviews.length / 10)) {
         setPage(newPage)
         let newItems = []
         for(var i = newPage * 10; i < newPage * 10 + 10; i++){
            if(i < data.reviews.length){
               newItems.push(i)
            }
         }
         setItems(newItems)
      }
   }

   const decrementPage = (page) => {
      let newPage = page - 1;
      if(page > 0) {
         setPage(newPage);
         let newItems = []
         for(var i = newPage * 10; i < newPage * 10 + 10; i++){
            newItems.push(i)
         }
         setItems(newItems)
      } 
   }

   const getStars = (numStars) => {
      let stars = [];
      for(var i = 0; i < numStars; i++) {
         stars.push(<i className="fas fa-star" 
                     style={{color: config.theme.color}}
                     key={`star-${Math.random().toString(36).substring(7)}`}></i>)
      }
      while(stars.length < 5){
         stars.push(<i className="far fa-star" 
                     style={{color: config.theme.color}}
                     key={`star-${Math.random().toString(36).substring(7)}`}></i>)
      }
      return stars;
   }

   return (
      <div className="container">
         <div className="review-actions">
            <div className="stars">
               {dataExists &&
               <>
                  <div>
                     {getStars(5)}
                     &nbsp;&nbsp;{data.stars['5']}
                  </div>
                  <div>
                     {getStars(4)}
                     &nbsp;&nbsp;{data.stars['4']}
                  </div>
                  <div>
                     {getStars(3)}
                     &nbsp;&nbsp;{data.stars['3']}
                  </div>
                  <div>
                     {getStars(2)}
                     &nbsp;&nbsp;{data.stars['2']}
                  </div>
                  <div>
                     {getStars(1)}
                     &nbsp;&nbsp;{data.stars['1']}
                  </div>
               </>
               }
            </div>
            <button onClick={() => setWrite(!write)}>
               Write a Review
            </button>
         </div>
         {write &&
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="form-group col-12 col-md-6">
                     <label htmlFor="nameInput">Name<span style={{color: 'red'}}>*</span></label>
                     <input type="text" name="username" className="form-control" id="nameInput" placeholder="John" required/>
                  </div>
                  <div className="form-group col-12 col-md-6">
                     <label htmlFor="ratingSelect">Rating<span style={{color: 'red'}}>*</span></label>
                     <select className="form-control" name="rating" id="ratingSelect" required>
                        <option value={5}>5 Stars - Love it!</option>
                        <option value={4}>4 Stars - Like it</option>
                        <option value={3}>3 Stars - It's okay</option>
                        <option value={2}>2 Stars - Didn't like it</option>
                        <option value={1}>1 Stars - Hate it</option>
                     </select>
                  </div>
               </div>
               <div className="form-group">
                  <label htmlFor="textInput">Review<span style={{color: 'red'}}>*</span></label>
                  <textarea className="form-control" name="review" id="textInput" rows="4" required></textarea>
               </div>
               <button type="submit">
                  Submit Review
               </button>
            </form>
         }
         {dataExists ?
         <>
         <table className="table">
            <tbody>
               {items.map((item, index) => {
                  if(data.reviews[item])
                  {
                     return (
                     <tr key={`review-row-${index}`}>
                        <td style={{width: '130px'}}>
                           <div className="user-container">
                              <i className="fas fa-user"></i>
                              <p>{data.reviews[item].username}</p>
                           </div>
                           <p className="date">{new Date(data.reviews[item].date).toLocaleDateString()}</p>
                           <div className="star-container">
                              <small>{data.reviews[item].rating}</small>
                              {getStars(data.reviews[item].rating)}
                           </div>
                        </td>
                        <td>
                           <p>{data.reviews[item].text}</p>
                        </td>
                        <td className="images">
                           {data.reviews[item].images.map((url, index) => {
                              return (
                              <a href={url} target="_blank" key={`review-img-${index}`}>
                                 <img src={url} className="img-max" />
                              </a>
                           )
                        })}
                        </td>
                     </tr>
                     )
                  }
               })
               }
            </tbody>
         </table>
         <div className="page-controls">
            <button onClick={() => decrementPage(page)}>Previous</button>
            <div>Page {page + 1}</div>
            <button onClick={() => incrementPage(page)}>&nbsp;&nbsp;Next&nbsp;&nbsp;</button>
         </div>
         </>
         :
         <div className="my-3">
            <hr />
            <div className="my-5" style={{textAlign: 'center'}}>
               <h4>No Reviews Yet</h4>
               <h5>Be the First!</h5>
            </div>
         </div>
         }
         <style jsx>{`
            @media (max-width: 767px){
               .images {
                  display: none;
               }
            }
            button {
               color: white;
               background: ${config.theme.color};
               border: none;
               padding: 5px 10px 5px 10px;
               font-weight: 600;
            }
            .date {
               margin: 5px auto 5px;
               font-size: 1rem;
            }
            form {
               margin-bottom: 15px;
            }
            .img-max {
               max-width: 75px;
            }
            .page-controls {
               display: flex;
               justify-content: space-between;
               align-items: center;
               font-weight: 600;
            }
            
            .review-actions {
               display: flex;
               justify-content: space-between;
               align-items: flex-end;
               margin: 20px auto 10px;
               font-weight: 600;
            }
            .review-actions .stars {
               display: flex;
               flex-direction: column;
               font-size: medium;
            }
            .review-actions .stars i {
               color: ${config.theme.color};
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
      </div>
   );
}

export default Review;
