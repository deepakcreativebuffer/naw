import React, { Component } from 'react';
import i18n from '../../helper/i18n/config';
import moment from 'moment';
import set_cookies from '../../helper/cookies/set_cookies'
import get_cookies from '../../helper/cookies/get_cookies'
import MoneyValue from '../main/MoneyValue';
import Image from 'next/image';
export default class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataTour: {
                title: '',
                duration: null,
                from: null,
                price: null,
                image: null,

                date: null,
                hour: null,
                priceTag: null,
                priceValue: null,
                taxt: null,
                taxValue: null,
                allTotal: null,

                payNow: null,
                payTour: null
            },
            step: null
        }
    }

    componentWillMount() {
        // this.handleDataTour()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.detailTour != this.props.detailTour) {
            this.handleDataTour()
        }
        if (prevProps.amountCoupon != this.props.amountCoupon) {
            this.handleDataTour()
        }
        if (prevProps.step != this.props.step) {
            this.setState({ step: this.props.step })
        }
    }

    handleDataTour = () => {

        let { valueLanguage } = this.props
        let { detailTour, amountCoupon, percentageCoupon } = this.props
        let where = null
        let dataTour = {}
        let image = null
        if (typeof (detailTour.destination) != 'undefined')
            if (typeof (detailTour.destination.name) != 'undefined')
                where = detailTour.destination.name
        if (typeof (detailTour.images) != 'undefined')
            if (detailTour.images.length > 0)
                image = detailTour.images[0].image

        // const date = get_cookies('reserveTourDate')
        // const hour = get_cookies('reserveTourHour')
        // const number = get_cookies('reserveTourNumber')
        if (typeof window !== "undefined") {

            let search = window.location.search;
            let params = new URLSearchParams(search);
            let date = atob(params.get('reserveD'));
            let hour = atob(params.get('reserveH'));
            let number = atob(params.get('reserveN'));

            if (detailTour != null) {
                moment.lang(valueLanguage);
                let dateTemp;
                let newDate;
                dateTemp = date.split("/")
                newDate = moment(`${dateTemp[2]}-${dateTemp[1]}-${dateTemp[0]}`).format("dddd, D MMMM YYYY");
                set_cookies('receiptName', detailTour.title)
                set_cookies('receiptDuration', detailTour.duration)
                set_cookies('receiptFrom', where)
                set_cookies('receiptDate', newDate)
                set_cookies('receiptHour', hour)
                set_cookies('receiptNumber', number)
                set_cookies('receiptPercentage', detailTour.prepayPorcent)
                dataTour.title = detailTour.title
                dataTour.duration = detailTour.duration
                dataTour.from = where
                dataTour.image = image
                dataTour.date = newDate
                dataTour.hour = hour
                dataTour.number = number

                let total = (parseFloat(detailTour.averagePrice) * number)
                let discount = 0
                if (typeof (detailTour.discount)) {
                    discount = parseFloat(detailTour.discount)
                    total = total - (discount * number)
                }
                let taxt = null
                let taxtValue = null
                if (typeof (detailTour.tax) != 'undefined') {
                    taxt = parseFloat(detailTour.tax)
                    taxtValue = total * (parseFloat(detailTour.tax) / 100)
                }
                let porcen = parseFloat(detailTour.prepayPorcent)
                let percentage = porcen / 100
                let percentageTour = 1 - percentage
                let payNow = ((total + taxtValue) * percentage).toFixed(2)
                let payTour = ((total + taxtValue) * percentageTour).toFixed(2)
                dataTour.priceTag = detailTour.averagePrice
                if (typeof (detailTour.discount) != 'undefined') {
                    dataTour.priceTag = (parseFloat(detailTour.averagePrice) - parseFloat(detailTour.discount)).toFixed(2)
                }
                set_cookies('receiptPriceTag', dataTour.priceTag)
                set_cookies('receiptPriceValue', (total).toFixed(2))
                set_cookies('receiptTaxt', taxt != null ? taxt.toFixed(0) : null)
                set_cookies('receiptTaxValue', taxtValue != null ? (taxtValue).toFixed(2) : null)
                set_cookies('receiptPercentageNaw', percentage)
                set_cookies('receiptPercentageTour', percentageTour)
                set_cookies('receiptPayTotal', (total + taxtValue).toFixed(2))
                dataTour.percentage = percentage
                dataTour.percentageTour = percentageTour
                dataTour.priceValue = (total).toFixed(2)
                dataTour.taxt = taxt != null ? taxt.toFixed(0) : null
                dataTour.taxValue = taxtValue != null ? (taxtValue).toFixed(2) : null
                dataTour.allTotal = (total + taxtValue).toFixed(2)
                let valDiscount = null
                let payNowCoupon = 0
                set_cookies('receiptCoupon', 'null')
                set_cookies('receiptPercentage', 'null')
                set_cookies('receiptCouponPay', 'null')
                dataTour.discount = valDiscount
                if (amountCoupon != null) {
                    if (percentageCoupon == false) {
                        valDiscount = amountCoupon
                        dataTour.allTotal = dataTour.allTotal - parseFloat(amountCoupon)
                        dataTour.allTotal = (dataTour.allTotal).toFixed(2)
                        payNowCoupon = (payNow - parseFloat(amountCoupon)).toFixed(2)
                        dataTour.discount = `-$ ${valDiscount} USD`
                        set_cookies('receiptPayTotal', dataTour.allTotal)
                    } else {
                        valDiscount = amountCoupon
                        dataTour.allTotal = dataTour.allTotal - (dataTour.allTotal * (parseFloat(amountCoupon) / 100))
                        dataTour.allTotal = (dataTour.allTotal).toFixed(2)
                        payNow = ((dataTour.allTotal) * percentage).toFixed(2)
                        payTour = ((dataTour.allTotal) * percentageTour).toFixed(2)
                        payNowCoupon = payNow
                        dataTour.discount = `-% ${valDiscount}`
                        set_cookies('receiptPayTotal', dataTour.allTotal)
                    }
                    set_cookies('receiptCoupon', parseFloat(amountCoupon).toFixed(2))
                    set_cookies('receiptPercentage', percentageCoupon)
                    set_cookies('receiptCouponPay', payNowCoupon)
                }
                dataTour.payNow = payNow
                dataTour.payTour = payTour
                dataTour.percentageCoupon = percentageCoupon
                set_cookies('receiptPayNow', payNow)
                set_cookies('receiptPayTour', payTour)

                dataTour.payNowCou = payNowCoupon
                this.setState({ dataTour })
            }
        }



    }

    render() {
        let { dataTour, step } = this.state
        let { title, duration, from, image, date, hour, number } = dataTour
        let { priceTag, priceValue, taxt, taxValue, allTotal } = dataTour
        let { payNow, payTour } = dataTour
        let { percentage, percentageTour } = dataTour
        let { discount, payNowCou, percentageCoupon } = dataTour

        return <>
            <div className="row">
                <div className="col-12">
                    <div className="sty-uty-font-17-1">
                        {title}
                    </div>
                    <div className="sty-content-detail">
                        {duration != null &&
                            <div className="sty-uty-font-15-3">
                                {i18n.t('reserve:duration')}: {duration} {i18n.t('reserve:hours')}
                            </div>
                        }
                        {from != null &&
                            <div className="sty-uty-font-15-3">
                                {i18n.t('reserve:location')}: {from}
                            </div>
                        }
                        <div className="sty-uty-font-15-3">
                            {i18n.t('reserve:bookOnly')} {this.props.detailTour.prepayPorcent}%   {i18n.t('reserve:inAdvance')}
                        </div>
                        <div className="sty-uty-font-15-3">
                            {i18n.t('reserve:date')}: {date}
                        </div>
                        <div className="sty-uty-font-15-3">
                            {i18n.t('reserve:time')}: {hour} hrs
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <hr />
                </div>
                <div className="col-12 sty-padding-sides sty-content-detail">
                    <div className="col-12">
                        <div className="row sty-uty-font-15-3">
                            <div className="col-6">
                                <MoneyValue price={priceTag}></MoneyValue> x {number}
                            </div>
                            <div className="col-6">
                                <MoneyValue price={priceValue}></MoneyValue>
                            </div>
                        </div>
                    </div>
                    {taxValue != null && <div className="col-12">
                        <div className="row sty-uty-font-15-3">
                            <div className="col-6">
                                {i18n.t('reserve:tax')} ({taxt}%)
                            </div>
                            <div className="col-6">
                                $ {taxValue}
                            </div>
                        </div>
                    </div>
                    }
                 
                        <div className="col-12 sty-content-detail">
                            <hr />
                        </div>
                        <div className="col-12">
                            <div className="row sty-uty-font-15-3">
                                <div className="col-6">
                                    {i18n.t('reserve:payTour')} ({(percentageTour * 100).toFixed(2)}%)
                                </div>
                                <div className="col-6">
                                    <MoneyValue price={payTour}></MoneyValue>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row sty-uty-font-15-3">
                                <div className="col-6">
                                    {i18n.t('reserve:payNow')} ({(percentage * 100).toFixed(2)}%)
                                </div>
                                <div className="col-6" id="id-amount-payment">
                                    <MoneyValue price={payNow}></MoneyValue>
                                </div>
                                <div className="col-6" id="id-amount-payment-2" hidden>
                                    {payNow}
                                </div>
                            </div>
                        </div>
                        {discount != null && <>
                            <div className="col-12">
                                <div className="row sty-uty-font-15-3">
                                    <div className="col-6">
                                        {i18n.t('reserve:discount')}
                                    </div>
                                    <div className="col-6" id="id-amount-payment">
                                        {discount}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row sty-uty-font-15-3">
                                    <div className="col-6">
                                        {i18n.t('reserve:payNow')}
                                    </div>
                                    <div className="col-6" id="id-amount-payment-c">
                                        <MoneyValue price={payNowCou}></MoneyValue>
                                    </div>
                                    <div className="col-6" id="id-amount-payment-c2" hidden>
                                        {payNowCou}
                                    </div>
                                </div>
                            </div>

                        </>}
                  
                    <div className="col-12 sty-uty-total-total">
                        <div className="row sty-uty-font-16-1">
                            <div className="col-6">
                                {i18n.t('reserve:total')}
                            </div>
                            <div className="col-6">
                                <MoneyValue price={allTotal}></MoneyValue>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="sty-cont-image-detail">
                        <div className="sty-uti-background">
                            {image && <Image src={image} layout='fill' loading="lazy" />}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="sty-cont-policy">
                        <div className="sty-uty-font-13-1 sty-title-policy">
                            {i18n.t('reserve:cancellationPolicies')}
                        </div>
                        <div className="sty-uty-font-12-1">
                            <ul>
                                <li>
                                    {i18n.t('reserve:policy_1')}
                                </li>
                                <li>
                                    {i18n.t('reserve:policy_2')}
                                </li>
                                <li>
                                    {i18n.t('reserve:policy_3')}
                                </li>
                                <li>
                                    {i18n.t('reserve:policy_4')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

}
