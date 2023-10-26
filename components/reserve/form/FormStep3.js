import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';

import get_cookies from '../../../helper/cookies/get_cookies'
import ReactDOMServer from 'react-dom/server';
import { rulesValidation } from '../../../helper/forms/rulesValidations'
import renderInput from '../../../helper/forms/input'
import renderRadio from '../../../helper/forms/radio'
import renderCheck from '../../../helper/forms/checkbox'

import request from '../../../helper/core_services/core/requestService'
import endPoints from '../../../helper/core_services/endpoints/coupons'
import FormStripe from './FormStripe'
import i18n from '../../../helper/i18n/config';
import MoneyValue from '../../main/MoneyValue';

const validate = values => {
    var fields = [
        {
            nameField: 'name',
            required: true
        },
        {
            nameField: 'type',
            required: true
        },
        // {
        //     nameField: 'flagNewsletter', 
        //     required: true
        // },
        {
            nameField: 'flagTerms',
            required: true
        },
    ]

    var errors = rulesValidation(fields, values);

    return errors
}

class FormStep3 extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            flagCoupon: null,
            typePay: [
                {
                    id: `id_type_1`,
                    value: 1,
                    name: i18n.t('reserve:option_1_1').replace('|', this.props.detailTour.prepayPorcent).replace('@', (100 - parseFloat(this.props.detailTour.prepayPorcent).toFixed(0)))
                }
            ], priceButton: 0

        }
    }

    componentDidMount() {
        this.props.dispatch(change('FormStep3', 'type', 1));
    }

    componentDidUpdate(prevProps) {

        if (prevProps.activeTab != this.props.activeTab && this.props.activeTab == '3') {
            setTimeout(() => {
                let element = document.getElementById('id-amount-payment-2')
                this.setState({ priceButton: parseFloat(element.innerHTML) })
                //  let button = document.getElementById('id-button-form-3')
                //   button.innerHTML = `${element.innerHTML} ${i18n.t('reserve:payment')}`
            }, 500)
        }
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.setState({ valueLanguage: this.props.valueLanguage })
            this.setState({
                typePay: [
                    {
                        id: `id_type_1`,
                        value: 1,
                        name: i18n.t('reserve:option_1_1').replace('|', this.props.detailTour.prepayPorcent).replace('@', (100 - parseFloat(this.props.detailTour.prepayPorcent).toFixed(0)))
                    }
                ]
            })
        }
    }

    handleValidateCoupon = async () => {
        let { uuid, valueLanguage, handleCoupon } = this.props
        let idReservation = get_cookies('IdReservation')
        let element = document.getElementById('id-code-coupon')
        let flagCoupon = null

        let params = {
            reservation: idReservation,
            code: element.value
        }
        let dataCoupon = await request(endPoints.post_coupon_validate, params, null, valueLanguage)

        if (dataCoupon != null) {
            handleCoupon(element.value, dataCoupon.object.amount, dataCoupon.object.percentage)
            flagCoupon = <div className="sty-uty-font-15-1 sty-coupon-true">
                {i18n.t('reserve:validCoupon')}
            </div>
            this.props.dispatch(change('FormStep3', 'coupon', element.value));
            setTimeout(() => {
                let element = document.getElementById('id-amount-payment-c2')
                this.setState({ priceButton: parseFloat(element.innerHTML) })
                //  let button = document.getElementById('id-button-form-3')
                //   button.innerHTML = `${element.innerHTML} ${i18n.t('reserve:payment')}`
            }, 500)
        }
        if (dataCoupon == null) {
            handleCoupon(null, null)
            flagCoupon = <div className="sty-uty-font-15-1 sty-coupon-false">
                {i18n.t('reserve:notValidCoupon')}
            </div>
            setTimeout(() => {
                let element = document.getElementById('id-amount-payment-2')
                this.setState({ priceButton: parseFloat(element.innerHTML) })
                //  let button = document.getElementById('id-button-form-3')
                //   button.innerHTML = `${element.innerHTML} ${i18n.t('reserve:payment')}`
            }, 500)
        }

        this.setState({ flagCoupon })
    }

    render() {
        const { handleSubmit } = this.props;
        const { handleInitStripe } = this.props;
        let { flagCoupon, typePay } = this.state

        return (
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <div className="col-12 sty-padding-sides">
                        <div className="sty-uty-font-18-1 sty-title-form">
                            {i18n.t('reserve:paymentMethod')}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 sty-content-input-3 sty-content-input">
                            <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:coupon')}
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <input
                                        type="text"
                                        className="sty-uty-input-3 w-100"
                                        name="coupon"
                                        onChange={this.test}
                                        id={"id-code-coupon"}
                                        placeholder={i18n.t('reserve:coupon')}
                                    />
                                    {flagCoupon != null && <>
                                        {flagCoupon}
                                    </>}
                                    <input
                                        type="text"
                                        className="hidden_element"
                                        name="coupon"
                                        placeholder={"Teléfono"}
                                    />
                                </div>
                                <div className="col-12 col-md-4 sty-cont-button-coupon">
                                    <button className="sty-button-1-2 sty-uty-font-16-1 fixe-1" type="button" onClick={this.handleValidateCoupon}>
                                        {i18n.t('button:button6')}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 sty-content-input-3 sty-content-input">
                            <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:card')}
                            </div>
                            <FormStripe
                                handleInitStripe={handleInitStripe}
                            />
                            {/* <Field
                                    // tag={"Correo"}
                                    component={renderInput}
                                    type="text"
                                    className="sty-uty-input-3 w-100"
                                    name="lastName"
                                    onChange={this.test}
                                    id={"contact-3"}
                                    placeholder={"Apellido"}
                                /> */}
                        </div>
                        <div className="col-12 sty-content-input-3 sty-content-input">
                            <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:fullName')}
                            </div>
                            <Field
                                component={renderInput}
                                type="text"
                                className="sty-uty-input-3 w-100"
                                name="name"
                                placeholder={i18n.t('reserve:name')}
                            />
                        </div>
                        <div className="col-12 sty-content-input-3 sty-content-input">
                            <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:tag1')}
                            </div>
                            <Field
                                component={renderRadio}
                                name="type"
                                elements={typePay}
                                className={"sty-uty-font-14-1"}
                                classRadio={"sty-check-container-2"}
                            />
                        </div>
                        <div className="col-12 sty-content-input-3 sty-content-input">
                            <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:tag2')}
                            </div>
                            <Field
                                component={renderCheck}
                                name="flagNewsletter"
                                tag={i18n.t('reserve:option_2_1')}
                                className={"sty-uty-font-14-1"}
                                id={'id-check'}
                            />
                        </div>
                        <div className="col-12 sty-content-input-3 sty-content-input">
                            <div className="sty-uty-font-15-1 sty-tag-input">
                                {i18n.t('reserve:tag3')}
                            </div>
                            <Field
                                component={renderCheck}
                                name="flagTerms"
                                tag={i18n.t('reserve:option_3_1')}
                                className={"sty-uty-font-14-1"}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <hr />
                </div>
                <div className="col-12 sty-container-button">
                    <button className="sty-button-1-1 sty-uty-font-16-1" onClick={this.handleContinue} id="id-button-form-3">
                        <MoneyValue price={this.state.priceButton}></MoneyValue> {i18n.t('reserve:payment')}
                    </button>
                </div>
            </form>
        );
    }
}

FormStep3 = reduxForm({
    form: 'FormStep3',
    validate,
})(FormStep3);


const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect(mapStateToProps)(FormStep3);