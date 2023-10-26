
export default ({
  input,
  className,
  value1,
  value2,
  title1,
  title2,
  meta: { touched, error },
}) => (
<div className="input_validation">
    <div className="row">
        <div className="col-6 fixRadioleft">
        <label className="boxcontainerRadio">
            <input {...input} type="radio" value={value1} />
            <div className="btn checkmark contentflex fixbutton fixbuttonleft">
                <span className="">
                    {title1}
                </span>
            </div>
        </label>
        </div>
        <div  className="col-6 fixRadioright">
        <label className="boxcontainerRadio">
            <input {...input} type="radio" value={value2} />
            <div className="btn checkmark contentflex fixbutton fixbuttonright">
                <span className="">
                    {title2}
                </span>
            </div>
        </label>
        </div>
    </div>
        
  { touched &&
    
      error && 
        <span className="text-center message_validation">
          <i className="fas fa-exclamation"></i>
          &nbsp;&nbsp;
          {error}
        </span>
    
  }
</div>
)