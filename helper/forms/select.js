
export default ({
  input,
  className,
  elements,
  meta: { touched, error },
  default_option
}) => (
<div className="input_validation">
  <select {...input} className={`cursor ${className}`}>
    <option value="" id="op_default" hidden>{default_option}</option>
    {elements}
  </select>
  { touched &&
      error && 
        <span className="text-center message_validation">
          &nbsp;&nbsp;
          {error}
        </span>
  }
</div>
)