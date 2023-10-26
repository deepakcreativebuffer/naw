import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, reset, FieldArray } from 'redux-form';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { rulesValidation } from '../../../helper/forms/rulesValidations'
import renderInput from '../../../helper/forms/input'
import renderArea from '../../../helper/forms/textarea'
import renderCheck from '../../../helper/forms/checkbox'

import get_cookies from '../../../helper/cookies/get_cookies'
import i18n from '../../../helper/i18n/config';

const validate = values => {
    var fields = [
        {
            nameField: 'name',
            required: true
        },
        {
            nameField: 'last',
            required: true
        },
        {
            nameField: 'email',
            required: true,
            formatMail: true
        },
        {
            nameField: 'phone',
            required: true
        },
        // {
        //     nameField: 'hotelOrAirbnbAdress', 
        //     required: true
        // },
    ]

    var errors = rulesValidation(fields, values);

    return errors
}

const renderSubFields = (adventure, index, fields) => (
    <div className="col-12 sty-padding-sides" key={`adventure_${index}`}>
        <div className="col-12 sty-padding-sides">
            <div className="sty-uty-font-18-1 sty-title-form">
                {i18n.t('reserve:adventurer')} {index + 2}
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-6 sty-content-input-3 sty-content-input">
                <Field
                    component={renderInput}
                    type="text"
                    className="sty-uty-input-3 w-100"
                    name={`${adventure}.firstName`}
                    placeholder={i18n.t('reserve:name')}
                />
            </div>
            <div className="col-12 col-md-6 sty-content-input-3 sty-content-input">
                <Field
                    component={renderInput}
                    type="text"
                    className="sty-uty-input-3 w-100"
                    name={`${adventure}.lastName`}
                    placeholder={i18n.t('reserve:lastName')}
                />
            </div>
        </div>
    </div>
)

class renderMembers extends React.Component {

    componentWillMount() {
        let { fields, counter } = this.props
        for (var i = 0; i < counter; i++) {
            fields.push({})
        }
    }

    render() {
        let { fields } = this.props
        return (<>
            {fields.map(renderSubFields)}
        </>)
    }
}

class FormStep2 extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            numberAdventure: 0,
            phoneValue: ''
        }
    }

    componentWillMount() {

        if (typeof window !== "undefined") {
            let search = window.location.search;
            let params = new URLSearchParams(search);
            const numberAdventure = parseInt(atob(params.get('reserveN'))) - 1
            this.setState({ numberAdventure })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.phoneValue != this.state.phoneValue) {
            this.props.dispatch(change('FormStep2', 'phone', this.state.phoneValue));
        }
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.setState({ valueLanguage: this.props.valueLanguage })
            this.props.dispatch(change('FormStep2', 'name', null));
            this.props.dispatch(change('FormStep2', 'lastName', null));
            this.props.dispatch(change('FormStep2', 'email', null));
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { detailTour } = this.props;
        let { numberAdventure, phoneValue } = this.state

        return (
            <form onSubmit={handleSubmit}>
                <div className="col-12 sty-padding-sides">
                    <div className="col-12 sty-padding-sides">
                        <div className="sty-uty-font-18-1 sty-title-form">
                            {i18n.t('reserve:adventurer')} 1 ({i18n.t('reserve:adventureInfo')})
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 sty-content-input-3 sty-content-input">
                            <Field
                                component={renderInput}
                                type="text"
                                className="sty-uty-input-3 w-100"
                                name="name"
                                placeholder={i18n.t('reserve:name')}
                            />
                        </div>
                        <div className="col-12 col-md-6 sty-content-input-3 sty-content-input">
                            <Field
                                // tag={"Correo"}
                                component={renderInput}
                                type="text"
                                className="sty-uty-input-3 w-100"
                                name="last"
                                placeholder={i18n.t('reserve:lastName')}
                            />
                        </div>
                        <div className="col-12 col-md-6 sty-content-input-3 sty-content-input">
                            <PhoneInput
                                preferredCountries={['mx', 'us']}
                                country={'mx'}
                                value={phoneValue}
                                onChange={phoneValue => this.setState({ phoneValue })}
                                placeholder={'hola'}
                            />
                            <Field
                                // tag={"Correo"}
                                component={renderInput}
                                type="text"
                                className="hidden_element"
                                name="phone"
                            // placeholder={"Teléfono"}
                            />
                        </div>
                        <div className="col-12 col-md-6 sty-content-input-3 sty-content-input">
                            <Field
                                // tag={"Correo"}
                                component={renderInput}
                                type="text"
                                className="sty-uty-input-3 w-100"
                                name="email"
                                placeholder={"E-mail"}
                            />
                        </div>
                    </div>
                </div>
                <FieldArray name="adventure" component={renderMembers} counter={numberAdventure} />
                {detailTour.pickup && <>
                    <div className="col-12 sty-padding-sides" >
                        <div className="col-12 sty-padding-sides">
                            <div className="sty-uty-font-18-1 sty-title-form">
                                {i18n.t('reserve:pickup_tag_1')}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 sty-content-input-3 sty-content-input sty-area">
                                <Field
                                    component={renderArea}
                                    rows={5}
                                    className="sty-uty-input-3 w-100 sty-textarea-1"
                                    name="hotelOrAirbnbAdress"
                                    placeholder={i18n.t('reserve:pickup_tag_2')}
                                />
                            </div>
                            <div className="col-12 sty-content-input-3 sty-content-input">
                                <Field
                                    component={renderCheck}
                                    name="sendAddressLater"
                                    tag={i18n.t('reserve:pickup_tag_3')}
                                    className={"sty-uty-font-14-1"}
                                />
                            </div>
                        </div>
                    </div>
                </>}
                {detailTour.sizes && <>
                    <div className="col-12 sty-padding-sides" >
                        <div className="col-12 sty-padding-sides">
                            <div className="sty-uty-font-18-1 sty-title-form">
                            {i18n.t('reserve:suit_size_tag_1')}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 sty-content-input-3 sty-content-input sty-area">
                                <Field
                                   component={renderArea}
                                    className="sty-uty-input-3 w-100 sty-textarea-1"
                                    name="suitSize"
                                    placeholder= {i18n.t('reserve:suit_size_tag_2')}
                                />
                            </div>
                        </div>
                    </div>
                </>}
                <div className="col-12">
                    <hr />
                </div>
                <div className="col-12 sty-padding-sides sty-container-button">
                    <button className="sty-button-1-1 sty-uty-font-16-1" onClick={this.handleContinue}>
                        {i18n.t('button:button5')}
                    </button>
                </div>
            </form>
        );
    }
}

FormStep2 = reduxForm({
    form: 'FormStep2',
    validate,
})(FormStep2);

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect(mapStateToProps)(FormStep2);