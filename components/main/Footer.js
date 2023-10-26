import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from '../../routes'
import i18n from '../../helper/i18n/config';

import { links } from '../../helper/constants/links/externals'

const logo = "/static/img/favicons/app/logo.png"
const facebook = "/static/img/favicons/social/facebook-logo.png"

const visa = "/static/img/payMethods/visa_icon.png"
const mastercard = "/static/img/payMethods/master_card_icon.png"
const americanExpress = "/static/img/payMethods/american_express_icon.png"
const bankTransfer = "/static/img/payMethods/bank_transfer_icon.png"
const oxxo = "/static/img/payMethods/oxxo_icon.png"
const paypal = "/static/img/payMethods/paypal_icon.png"

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/fontawesome-free-brands'
import MoneySwitch from './MoneySwitch';
import Image from 'next/image';

class Footer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            trip: null,
            whatsAppTel: null
        }
    }

    componentDidMount() {
        var component = this

        setTimeout(() => {
            component.setState({ trip: 1 })
            // injectsocialButtonReviews8832()
            window.taValidate()
        }, 2000)

        this.handleInfo()
    }

    handleInfo = async () => {
        let { valueLanguage } = this.props
        let data = await request(endPoints.get_extras, null, null, valueLanguage)
        if (data != null) {
            this.setState({ whatsAppTel: data.object.whatsAppTel?.tel })
        }
    }

    render() {
        let { trip } = this.state
        let { whatsAppTel } = this.state

        return <div ref={el => (this.div = el)}>
            <section className="container-fluid sty-footer">
                <a target="_blank" id="btn-wa" className="btn-naw-wa-fixed" href={`https://wa.me/${whatsAppTel}?text=Hello%20NAW!`}>
                    <div className="sty-cont-whattsapp">
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </div>
                </a>
                <div className="row justify-content-center">
                    <div className="col-11">
                        <div className="row text-center text-md-left justify-content-center">
                            <div className="col-12 col-md-3 text-center order-1">
                                <div className="sty-cont-logo">
                                    <img src={logo} />
                                </div>
                                <div className="sty-copyright sty-content-hidden-resp">
                                    COPYRIGHT NAW. ALL RIGHT RESERVED
                                </div>

                            </div>
                            <div className="col-12 col-md-3 sty-content order-3 order-md-2">
                                <div className="sty-link-footer sty-content-hidden-resp">
                                    <Link route={"contact"}>
                                        <a>
                                            {i18n.t('footer:contact')}
                                        </a>
                                    </Link>
                                </div>
                                <div className="sty-link-footer sty-content-hidden-resp">
                                    <a href={links.blog}>
                                        {i18n.t('footer:blog')}
                                    </a>
                                </div>
                                <div className="sty-link-footer sty-content-hidden-resp">
                                    <Link route={"about_us"}>
                                        <a>
                                            {i18n.t('footer:about')}
                                        </a>
                                    </Link>
                                </div>
                                <div className="sty-link-footer sty-content-hidden-resp">
                                    <Link route={"subscribe"}>
                                        <a>
                                            {i18n.t('footer:subscribe')}
                                        </a>
                                    </Link>
                                </div>
                                <div className='moneySwitch-resp row justify-content-center justify-content-md-end'>
                                    <MoneySwitch onFooter={true}></MoneySwitch>
                                </div>
                                <div className="sty-link-footer ">
                                    <Link route={"terms"}>
                                        <a>
                                            {i18n.t('footer:terms')}
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 sty-content text-center text-md-left order-2 order-md-3">
                                <div className="sty-data-footer">
                                    {i18n.t('footer:call_us')}:
                                    <br />
                                    <a href="tel:+5219841900863">+52 1 9841900863</a>
                                </div>
                                <div className="sty-data-footer">
                                    {i18n.t('footer:address')}: Playacar, Playa del Carmen, QROO.
                                </div>
                                <div className="sty-data-footer">
                                    <a href="mailto:info@naw.mx">
                                        {i18n.t('footer:email')}: info@naw.mx
                                    </a>
                                </div>
                                <div className="payment-methods">
                                    <div>
                                        <Image width='240' height='150' loading="lazy" src={visa} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='240' height='150' loading="lazy" src={mastercard} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='150' height='150' loading="lazy" src={americanExpress} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='150' height='150' loading="lazy" src={bankTransfer} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='240' height='150' loading="lazy" src={oxxo} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='240' height='150' loading="lazy" src={paypal} />
                                    </div>

                                </div>
                            </div>

                            <div id="TA_certificateOfExcellence412" className="TA_certificateOfExcellence-resp">
                                <a target="_blank" href="https://www.tripadvisor.com.mx/Attraction_Review-g150812-d13354576-Reviews-Naw-Playa_del_Carmen_Yucatan_Peninsula.html">
                                    <Image src="https://www.tripadvisor.com.mx/img/cdsi/img2/awards/v2/tchotel_2020_LL-14348-2.png" width='75px' height='50px' alt="TripAdvisor" className="widCOEImg" id="CDSWIDCOELOGO" />
                                </a>
                            </div>

                            <div className="col-12 col-md-2 sty-content order-4">
                                <div className='moneySwitch row justify-content-center justify-content-md-end'>

                                    <MoneySwitch onFooter={true}></MoneySwitch>

                                </div>
                                <div id="TA_certificateOfExcellence412" className="TA_certificateOfExcellence">
                                    <a target="_blank" href="https://www.tripadvisor.com.mx/Attraction_Review-g150812-d13354576-Reviews-Naw-Playa_del_Carmen_Yucatan_Peninsula.html">
                                        <Image src="https://www.tripadvisor.com.mx/img/cdsi/img2/awards/v2/tchotel_2020_LL-14348-2.png" width='75px' height='50px' alt="TripAdvisor" className="widCOEImg" id="CDSWIDCOELOGO" />
                                    </a>
                                </div>
                                <div className="row justify-content-center justify-content-md-end">

                                    <a href={links.facebook} target="_blank" className='socialMedia'>
                                        <div className="col-2">
                                            <div className="sty-social pr-6">
                                                <img src={facebook} width='10' height='20' />
                                            </div>
                                        </div>
                                    </a>
                                    <script src="https://apps.elfsight.com/p/platform.js" defer></script>
                                    <div class="elfsight-app-7ffb5c27-f914-4703-8269-70b37d4dd399"></div>
                                </div>

                                <div className="sty-content">
                                    <div id="TA_socialButtonReviews431" className="TA_socialButtonReviews"></div>
                                </div>

                            </div>


                            <div className="col-12 col-md-4 sty-content text-center text-md-left sty-content-show-resp order-5">
                                <div className="sty-copyright">
                                    COPYRIGHT NAW. ALL RIGHT RESERVED
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (stateLanguage) => {
            dispatch({ type: 'STATE_LANGUAGE', stateLanguage });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
