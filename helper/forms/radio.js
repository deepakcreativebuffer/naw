
export default ({
  input,
  classParent,
  className,
  classRadio,
  elements,
  meta: { touched, error },
}) => (
<div className={`input_validation ${classParent}`}>
    { elements.map((element, i) => {
        var id = element.id
        var classElement = element.classElement
        var value = element.value
        var tag = element.tag
        var name = element.name

        return <div className={`${className} ${classElement}`} key={`radio_${tag}_${id}`}>
            <label className={classRadio}>+
              <input {...input} type="radio" value={value} checked={input.value ? true : false}/>
              <span className="sty-checkmark"></span>
              {tag&&
              <div className="sty-content-tag">
                <div className="sty-tag">{tag}</div>
              </div>
              }
            </label>
            {name&&
              <div className="sty-name">
                {name}
              </div>
            }
        </div>
      })
    }
  { touched &&
      error && 
        <span className="text-center message_validation">
          {error}
        </span>
  }
</div>
)