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
import renderCheck  from '../../../helper/forms/checkbox'

const validate = values => {
    var fields = [
        {
            nameField: 'first_name', 
            required: true
        },
        {
            nameField: 'last_name', 
            required: true
        },
        {
            nameField: 'email', 
            required: true,
            formatMail: true
        },
        {
            nameField: 'flagTerms', 
            required: true,
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
                        <div className="col-12 sty-input-form">
                            <div className="sty-container-input-1">
                                <div className="sty-icon-2">
                                    <FontAwesomeIcon className="sty-icon" icon={faUser} />
                                </div>
                                <Field
                                    className="sty-uty-input-2 w-100"
                                    component={renderInput}
                                    name="first_name"
                                    elements={adventurousOpt}
                                    placeholder={i18n.t('contact:name_1')}
                                />
                            </div>
                        </div>
                        <div className="col-12 sty-input-form">
                            <div className="sty-container-input-1">
                                <div className="sty-icon-2">
                                    <FontAwesomeIcon className="sty-icon" icon={faUser} />
                                </div>
                                <Field
                                    className="sty-uty-input-2 w-100"
                                    component={renderInput}
                                    name="last_name"
                                    elements={adventurousOpt}
                                    placeholder={i18n.t('contact:lastName')}
                                />
                            </div>
                        </div>
                        <div className="col-12 sty-input-form">
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
                        <div className="col-12 sty-content-input-3 sty-content-input sty-input-form">
                            {/* <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:tag3')}
                            </div> */}
                            <Field
                                component={renderCheck}
                                name="flagTerms"
                                tag={i18n.t('reserve:option_4_1')}
                                tagLink={i18n.t('reserve:option_4_1_a')}
                                tagLinkUrl={'privacy'}
                                className={"sty-uty-font-14-1"}
                            />
                        </div>
                        <div className="text-center col-12">
                            <button className="sty-button-1 sty-uty-font-16-1 sty-button-w1">
                                {i18n.t('button:button8')}
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