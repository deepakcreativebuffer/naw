import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import { autoHeightMinMiddle } from '../../helper/appearance/autoheight'
import get_cookies from '../../helper/cookies/get_cookies'

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'

import Steps from './Steps'
import Information from './Information'
import MoneyValue from '../main/MoneyValue';

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataReceipt: {}
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        autoHeightMinMiddle("class-autoheight")
        let dataReceipt = {
            title: get_cookies('receiptName'),
            duration: get_cookies('receiptDuration'),
            from: get_cookies('receiptFrom'),
            date: get_cookies('receiptDate'),
            hour: get_cookies('receiptHour'),
            number: get_cookies('receiptNumber'),
            priceTag: get_cookies('receiptPriceTag'),
            priceValue: get_cookies('receiptPriceValue'),
            taxt: get_cookies('receiptTaxt'),
            taxValue: get_cookies('receiptTaxValue'),
            percentage: (parseFloat(get_cookies('receiptPercentageNaw')) * 100).toFixed(2),
            percentageTour: (parseFloat(get_cookies('receiptPercentageTour')) * 100).toFixed(2),
            payNow: get_cookies('receiptPayNow'),
            payTour: get_cookies('receiptPayTour'),
            allTotal: get_cookies('receiptPayTotal'),
            discount: null,
            payNowCou: null
        }
        let coupon = get_cookies('receiptCoupon')
        let payNawCou = get_cookies('receiptCouponPay')
        let receiptPercentage = get_cookies('receiptPercentage')
        if (coupon != 'null') {
            dataReceipt['payNowCou'] = payNawCou
            if (receiptPercentage == 'true') {
                dataReceipt['discount'] = `-% ${coupon}`
            } else {
                dataReceipt['discount'] = `-$ ${coupon} USD`
            }
        }

        this.setState({ dataReceipt })
    }

    handleCurrentStep = (step) => {
        this.setState({ step })
    }

    render() {
        let { dataReceipt } = this.state

        return <>
            <div className="row justify-content-center sty-reserve">
                <div className="col-11 col-md-6">
                    <div className="sty-content-receipt">
                        <div className="row">
                            <div className="col-12">
                                <div className="sty-uty-font-17-1">
                                    {dataReceipt.title}
                                </div>
                                <div className="sty-content-detail">
                                    <div className="sty-uty-font-15-3 sty-tag-1">
                                        {i18n.t('reserve:duration')}: {dataReceipt.duration} {i18n.t('reserve:hours')}
                                    </div>
                                    <div className="sty-uty-font-15-3 sty-tag-1">
                                        {i18n.t('reserve:location')}: {dataReceipt.from}
                                    </div>
                                    <div className="sty-uty-font-15-3 sty-tag-1">
                                        {i18n.t('reserve:date')}: {dataReceipt.date}
                                    </div>
                                    <div className="sty-uty-font-15-3 sty-tag-1">
                                        {i18n.t('reserve:time')}: {dataReceipt.hour} hrs
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <hr />
                            </div>
                            <div className="col-12 sty-padding-sides sty-content-detail">
                                <div className="col-12">
                                    <div className="row sty-uty-font-15-3  sty-tag-1">
                                        <div className="col-6">
                                            <MoneyValue price={dataReceipt.priceTag}></MoneyValue>
                                        </div>
                                        <div className="col-6">
                                            <MoneyValue price={dataReceipt.priceValue}></MoneyValue>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row sty-uty-font-15-3  sty-tag-1">
                                        <div className="col-6">
                                            {i18n.t('reserve:tax')} ({dataReceipt.taxt}%)
                                        </div>
                                        <div className="col-6">
                                            <MoneyValue price={dataReceipt.taxValue}></MoneyValue>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sty-content-detail">
                                    <hr />
                                </div>
                                <div className="col-12">
                                    <div className="row sty-uty-font-15-3  sty-tag-1">
                                        <div className="col-6">
                                            {i18n.t('reserve:payTour')} ({dataReceipt.percentageTour}%)
                                        </div>
                                        <div className="col-6">
                                            <MoneyValue price={dataReceipt.payTour}></MoneyValue>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row sty-uty-font-15-3  sty-tag-1">
                                        <div className="col-6">
                                            {i18n.t('reserve:payNow')} ({dataReceipt.percentage}%)
                                        </div>
                                        <div className="col-6" id="id-amount-payment">
                                            <MoneyValue price={dataReceipt.payNow}></MoneyValue>
                                        </div>
                                    </div>
                                </div>
                                {dataReceipt.discount != null && <>
                                    <div className="col-12">
                                        <div className="row sty-uty-font-15-3">
                                            <div className="col-6">
                                                {i18n.t('reserve:discount')}
                                            </div>
                                            <div className="col-6" id="id-amount-payment">
                                                {dataReceipt.discount}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row sty-uty-font-15-3">
                                            <div className="col-6">
                                                {i18n.t('reserve:payNow')}
                                            </div>
                                            <div className="col-6" id="id-amount-payment-c">
                                                <MoneyValue price={dataReceipt.payNowCou}></MoneyValue>
                                            </div>
                                        </div>
                                    </div>
                                </>}
                                <div className="col-12 sty-uty-total-total">
                                    <div className="row sty-uty-font-16-1  sty-tag-1">
                                        <div className="col-6">
                                            {i18n.t('reserve:total')}
                                        </div>
                                        <div className="col-6">
                                            <MoneyValue price={dataReceipt.allTotal}></MoneyValue>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

}

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect(mapStateToProps)(Layout);