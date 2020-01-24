
const Stepper = ({config, steps, currentStep}) => {

   return (
      <div className="stepper-container">
         
         {steps.map((step, index) => 
            <div className="step-container" key={`step-${index}`}>
               {index > 0 &&
                  <div className="step-connector">
                     <span className={`step-connector-line ${currentStep >= index && 'step-connector-line-active'}`}></span>
                  </div>
               }
               <span className="step">
                  <span className="step-icon-container">
                     <svg className="svg-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                        <circle className={currentStep >= index && 'svg-icon-active'} cx="12" cy="12" r="12"></circle>
                        <text className="step-icon-text" x="12" y="16" textAnchor="middle">{index + 1}</text>
                     </svg>
                  </span>
                  <span className="step-label-container">
                     <span className="step-label step-label-active">
                        {step.label}
                     </span>
                  </span>
               </span>
            </div>
         )}

      <style jsx>{`
         .stepper {
            max-width: 700px;
            display: flex;
            justify-content: center;
            align-items: center;
         }
         .stepper-container {
            display: flex;
            flex-direction: row;
            flex: 1;
            position: relative;
            align-items: center;
            padding: 10px;
            color: rgba(0, 0, 0, 0.87);
            transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            background-color: #fff;
            box-shadow: none;
         }
         .step-container {
            display: block;
            padding-left: 8px;
            padding-right: 8px;
            flex: 1;
            position: relative;
         }
         .step {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
         }
         .step-icon-container {
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            padding-right: 8px;
            padding-left: 8px;
         }

         .svg-icon {
            fill: currentColor;
            width: 1em;
            height: 1em;
            display: inline-block;
            font-size: 1.5rem;
            transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            flex-shrink: 0;
            user-select: none;
            color: rgba(0, 0, 0, 0.38);
            display: block;
         }
         .svg-icon .svg-icon-active {
            fill: ${config.theme.color};
         }
         .step-label-container {
            width: 100%;
         }
         .step-label {
            margin: 0;
            margin-top: 16px;
            text-align: center;
            font-size: 0.875rem;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-weight: 400;
            line-height: 1.43;
            letter-spacing: 0.01071em;
            display: block;
            color: rgba(0, 0, 0, 0.54);
         }
         .step-label .step-label-active {
            color: rgba(0, 0, 0, 0.87);
            font-weight: 500;
         }
         .step-icon-text {
            fill: #fff;
            font-size: 0.75rem;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
         }
         .step-connector {
            display: block;
            flex: 1 1 auto;
            top: 12px;
            left: calc(-50% + 20px);
            right: calc(50% + 20px);
            position: absolute;
         }
         .step-connector-line {
            display: block;
            border-color: #bdbdbd;
            border-top-style: solid;
            border-top-width: 1px;
         }
         .step-connector-line-active {
            border-color: ${config.theme.color};
            border-top-width: 2px;
         }
      `}</style>
      </div>
   )
}

 export default Stepper

