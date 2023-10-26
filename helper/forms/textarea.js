
export default ({
  input,
  placeholder,
  className,
  rows,
  meta: { touched, error }
}) => (
<div className="input_validation">
  <textarea {...input} placeholder={placeholder} className={className} rows={rows}></textarea>
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