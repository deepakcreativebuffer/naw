
export default ({
  input,
  className,
  valueSelect,
  tag,
  meta: { touched, error },
}) => (
<div className="input_validation">
  <select {...input} className={`cursor ${className}`}>
    <option value={valueSelect}>{tag}</option>
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