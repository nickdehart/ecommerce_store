import states from './states';
import countries from './countries';
import Button from '../button';

const Billing = ({config, text, handleSubmit, fields}) => {
   let address1 = '';
   let address2 = '';
   if(fields && fields.address1 && fields.address2){
      address1 = fields.address1
      address2 = fields.address2
   } else if (fields && fields.address1){
      address1 = fields.address1
   } else if (fields && fields.address2){
      address1 = fields.address2
   }

   return (
      <div className="container">

         <form onSubmit={handleSubmit}>
            
            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="text" 
                     className="form-control" 
                     name="firstName" 
                     placeholder="First name" 
                     defaultValue={fields && fields.firstName ? fields.firstName : ''} 
                     required 
                  />
               </div>
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="text" 
                     className="form-control" 
                     name="lastName" 
                     placeholder="Last name" 
                     defaultValue={fields && fields.lastName ? fields.lastName : ''} 
                     required 
                  />
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="text" 
                     className="form-control" 
                     name="address1" 
                     placeholder="Address" 
                     defaultValue={address1} 
                     required 
                  />
               </div>
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="text" 
                     className="form-control" 
                     name="address2" 
                     placeholder="Apartment, suite, etc. (optional)" 
                     defaultValue={address2} 
                  />
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="text" 
                     className="form-control" 
                     name="city" 
                     placeholder="City" 
                     defaultValue={fields && fields.city ? fields.city : ''} 
                     required 
                  />
               </div>
               <div className="form-group col-12 col-md-6">
                  <input 
                     list="countries" 
                     className="form-control" 
                     name="country" 
                     placeholder="Country/Region" 
                     defaultValue={fields && fields.country ? fields.country : ''} 
                     required 
                  />
                  <datalist id="countries">
                     {countries.map((country, index) => <option key={`country-option-${index}`} value={country.value} />)}
                  </datalist>
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input 
                     list="states" 
                     className="form-control" 
                     name="state" 
                     placeholder="State" 
                     defaultValue={fields && fields.state ? fields.state : ''} 
                     required 
                  />
                  <datalist id="states">
                     {states.map((state, index) => <option key={`state-option-${index}`} value={state.value}>{state.name}</option>)}
                  </datalist>
               </div>
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="number" 
                     className="form-control" 
                     name="zip" 
                     placeholder="ZIP code" 
                     defaultValue={fields && fields.zip5 ? fields.zip5 : ''} 
                     required 
                  />
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="email" 
                     className="form-control" 
                     name="email" 
                     aria-describedby="emailHelp" 
                     placeholder="Email" 
                     defaultValue={fields && fields.email ? fields.email : ''} 
                     required 
                  />
                  <small id="emailHelp" className="form-text text-muted">For order updates only.</small>
               </div>
               <div className="form-group col-12 col-md-6">
                  <input 
                     type="tel" 
                     className="form-control" 
                     name="phone" 
                     placeholder="Phone (optional)"
                     defaultValue={fields && fields.phone ? fields.phone : ''} 
                  />
               </div>
            </div>

            <div style={{maxWidth: '400px'}} className="mx-auto">
               <Button variant={'button'} fullWidth invert>{text}</Button>
            </div>
         </form>

      <style jsx>{`
         .addressQuestion {
            max-width: 400px;
            color: #6c757d;
            display: flex;
            justify-content: center;
            align-items: center;
         }
         .addressQuestion :hover{
            cursor: pointer;
         }
         .addressQuestion span {
            margin: 10px;
         }
      `}</style>
      </div>
   )
}

 export default Billing

