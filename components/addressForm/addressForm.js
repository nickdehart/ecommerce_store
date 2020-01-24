import states from './states';
import countries from './countries';
import Button from '../button';

const Billing = ({config, text, handleSubmit}) => {
   const [checked, setChecked] = React.useState(false);

   return (
      <div className="container">

         <form onSubmit={handleSubmit}>
            
            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input type="text" className="form-control" name="firstName" placeholder="First name" required />
               </div>
               <div className="form-group col-12 col-md-6">
                  <input type="text" className="form-control" name="lastName" placeholder="Last name" required />
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input type="text" className="form-control" name="address1" placeholder="Address" required />
               </div>
               <div className="form-group col-12 col-md-6">
                  <input type="text" className="form-control" name="address2" placeholder="Apartment, suite, etc. (optional)" />
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input type="text" className="form-control" name="city" placeholder="City" required />
               </div>
               <div className="form-group col-12 col-md-6">
                  <input list="countries" className="form-control" name="country" placeholder="Country/Region" required />
                  <datalist id="countries">
                     {countries.map((country, index) => <option key={`country-option-${index}`} value={country.value} />)}
                  </datalist>
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input list="states" className="form-control" name="state" placeholder="State" required />
                  <datalist id="states">
                     {states.map((state, index) => <option key={`state-option-${index}`} value={state.value}>{state.name}</option>)}
                  </datalist>
               </div>
               <div className="form-group col-12 col-md-6">
                  <input type="number" className="form-control" name="zip" placeholder="ZIP code" required />
               </div>
            </div>

            <div className="row">
               <div className="form-group col-12 col-md-6">
                  <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Email" required />
                  <small id="emailHelp" className="form-text text-muted">For order updates only.</small>
               </div>
               <div className="form-group col-12 col-md-6">
                  <input type="tel" className="form-control" name="phone" placeholder="Phone (optional)" />
               </div>
            </div>

            {/* <div className="addressQuestion mx-auto" onClick={() => setChecked(!checked)}>
               <input type="hidden" name="billingAddressSame" value={checked} />
               <span>
                  {
                     checked ? <i className="fas fa-check-square" />
                     :
                     <i className="far fa-square" />
                  }
               </span>
               
               Billing address same as shipping?
            </div> */}
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

