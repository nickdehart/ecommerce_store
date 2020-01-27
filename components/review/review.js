import Swal from 'sweetalert2'
import DesktopTable from './desktopTable'
import MobileTable from './mobileTable'
import useWindowSize from '../../hooks/useWindowSize'

const Review = ({config, data, product}) => {
   const [page, setPage] = React.useState(0);
   const [items, setItems] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
   const [write, setWrite] = React.useState(false);
   const size = useWindowSize();

   let dataObj = {}
   for(var i = 0; i < data.length; i++){
      dataObj[data[i]._id] = data[i]
   }
   
   const handleSubmit = (e) => {
      e.preventDefault();
      fetch('/api/review', {
         method: 'POST',
         headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
         }, 
         body: JSON.stringify({
               username: e.target.username.value,
               rating: e.target.rating.value,
               text: e.target.review.value,
               date: new Date(),
               id: product.id,
               name: product.name.toLowerCase(),
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
         .catch(error => console.error(error))
   }

   const incrementPage = (page) => {
      let newPage = page + 1;
      if((page + 1) < (dataObj[0].reviews.length / 10)) {
         setPage(newPage)
         let newItems = []
         for(var i = newPage * 10; i < newPage * 10 + 10; i++){
            if(i < dataObj[0].reviews.length){
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
               {data.length > 1 &&
               <>
                  <div>
                     {getStars(5)}
                     &nbsp;&nbsp;{dataObj[5] ? dataObj[5].count : 0}
                  </div>
                  <div>
                     {getStars(4)}
                     &nbsp;&nbsp;{dataObj[4] ? dataObj[4].count : 0}
                  </div>
                  <div>
                     {getStars(3)}
                     &nbsp;&nbsp;{dataObj[3] ? dataObj[3].count : 0}
                  </div>
                  <div>
                     {getStars(2)}
                     &nbsp;&nbsp;{dataObj[2] ? dataObj[2].count : 0}
                  </div>
                  <div>
                     {getStars(1)}
                     &nbsp;&nbsp;{dataObj[1] ? dataObj[1].count : 0}
                  </div>
               </>
               }
            </div>
            <button onClick={() => setWrite(!write)}>
               Write a Review
            </button>
         </div>
         <form onSubmit={handleSubmit} style={{display: write ? 'block' : 'none'}}>
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
         {data.length > 1 ?
         <>
         {size && size.width > 767 &&
            <DesktopTable 
               dataObj={dataObj}
               items={items}
               getStars={getStars}
            />
         }
         {size && size.width < 768 &&
            <MobileTable 
               dataObj={dataObj}
               items={items}
               getStars={getStars}
            />
         }
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
