
export default ({
  id,
  input,
  placeholder,
  type,
  className,
  max=null,
  tag=null,
  meta: { touched, error }
}) => (
<div className="input_validation">
  <input {...input} id={id} placeholder={placeholder} type={type} className={className} maxLength={max} style={{backgroundColor: error && touched && '#FD8585', color: error && touched && '#ffffff'} }/>
  <div className="sty-uty-tag">
    {tag}
  </div>
  { touched &&
      error && 
      <span className="text-center message_validation">
        &nbsp;&nbsp;
        {error}
      </span>
  }
</div>
)