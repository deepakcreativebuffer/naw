import { Link } from '../../routes'

export default ({
  input,
  id,
  className,
  tag,
  tagName,
  tagLink = null,
  tagLinkUrl = '#',
  meta: { touched, error },
}) => (
  <div className={`input_validation ${className}`}>
    <span className="sty-check-container-1" >
      <label className="containerCheckbox">
        <input {...input} type="checkbox" id={id} checked={input.value ? true : false} />
        <span className="sty-checkmark" style={{ backgroundColor: error && touched && '#FD8585' }}></span>
        {tagName &&
          <div className="sty-content-tag">
            <div className="sty-tag">
              {tagName}
            </div>
          </div>
        }
      </label>
    </span>
    {tag &&
      <div className="sty-name" style={{ color: error && touched && '#FD8585' }}>
        {tag}&nbsp;{tagLink != null && <Link route={tagLinkUrl}>{tagLink}</Link>}
      </div>
    }
    {touched &&
      error &&
      <span className="text-center message_validation">
        {error}
      </span>
    }
  </div>
)