import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import i18n from '../../../helper/i18n/config';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { rulesValidation } from '../../../helper/forms/rulesValidations'
import renderInput from '../../../helper/forms/input'
import renderArea from '../../../helper/forms/textarea'


const validate = values => {
    var fields = [
        {
            nameField: 'name', 
            required: true
        },
        {
            nameField: 'email', 
            required: true,
            formatMail: true
        }
    ]

    var errors = rulesValidation( fields, values );

    return errors
}

const adventurous = [1,2,3,4,5,6,7,8,9,10,11,12]

class FormContact extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            date: new Date(),
            date_select: null
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
            this.props.dispatch(change('FormContact', 'name', null));
            this.props.dispatch(change('FormContact', 'email', null));
        }
    }

    componentWillMount(){
        let hourSelect = this.props.time
        this.props.dispatch(change('FormFirts', 'hour', hourSelect));
    }

    handleStartTime = (date_select) =>{
        this.setState({date_select})
        this.props.dispatch(change('FormFirts', 'date', moment(date_select).format('DD/MM/YYYY')));
    }

    render(){
        const { handleSubmit, time } = this.props
        let { date, date_select} = this.state

        let hourSelect = time
        let hourSelectTag = moment(time, 'HH:mm').format('hh:mm A')

        let adventurousOpt = adventurous.map((element, i) => {
            return <option key={`count_${i}`} value={element}>
                {element}
            </option>
        })

        return (
                <form onSubmit={ handleSubmit }>
                    <div className="row">
                        <div className="col-12 col-md-6 sty-input-form">
                            <div className="sty-container-input-1">
                                <div className="sty-icon-2">
                                    <FontAwesomeIcon className="sty-icon" icon={faUser} />
                                </div>
                                <Field
                                    className="sty-uty-input-2 w-100"
                                    component={renderInput}
                                    name="name"
                                    elements={adventurousOpt}
                                    placeholder={i18n.t('contact:name')}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 sty-input-form">
                            <div className="sty-container-input-1">
                                <div className="sty-icon-2">
                                    <FontAwesomeIcon className="sty-icon" icon={faEnvelope} />
                                </div>
                                <Field
                                    className="sty-uty-input-2 w-100"
                                    component={renderInput}
                                    name="email"
                                    elements={adventurousOpt}
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="col-12 sty-input-form">
                            <div className="sty-container-input-1">
                                <Field
                                    className="sty-uty-area-2 w-100"
                                    component={renderArea}
                                    name="message"
                                    elements={adventurousOpt}
                                    rows={"6"}
                                    placeholder={i18n.t('contact:message')}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="sty-button-1 sty-uty-font-16-1 sty-button-w1">
                                {i18n.t('button:button7')}
                            </button>
                        </div>
                    </div>
                </form>
            );
    }
}

FormContact = reduxForm({
  form: 'FormContact',
  validate,
})(FormContact);

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( FormContact );