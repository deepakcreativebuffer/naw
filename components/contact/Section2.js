import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import { links } from '../../helper/constants/links/externals'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsappSquare } from '@fortawesome/fontawesome-free-brands'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/fontawesome-free-brands'
import { faFacebookMessenger } from '@fortawesome/fontawesome-free-brands'
import { faInstagram } from '@fortawesome/fontawesome-free-brands'
import { faTripadvisor } from '@fortawesome/fontawesome-free-brands'

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/reservation'
import { loadElement } from '../../helper/appearance/load'
import { messageAlert } from '../../helper/appearance/messageAlert'

import Form from './form/contact'

class Layout extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    handleForm = async (form) => {
        let { valueLanguage } = this.props
        let params = {
            name: form.name,
            email: form.email,
            message: form.message
        }

        loadElement(true)
        let data = await request(endPoints.post_contact, params, null, valueLanguage)
        if (data != null)
            messageAlert('mesage_1')

    }

    render() {

        return <>
            <section className="container-fluid sty_contact sty-uty-padding-section-1">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-9">
                        <div className="row">
                            <div className="col-12 col-md-4 align-self-center order-1 order-md-1">
                                <div className="sty-section-contact">
                                    <div className="sty-title sty-uty-font-20-2">
                                        {i18n.t('contact:phone')}
                                    </div>
                                    {/* <div className="sty-link sty-uty-font-18-1">
                                        <a className="sty-uty-font-30-1 sty-color-whatsapp" href="https://wa.me/5215551029623?text=Hello%20NAW!" target="_blank">
                                            <FontAwesomeIcon icon={faWhatsappSquare}/> 
                                        </a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a className="sty-uty-font-16-1" href="tel:+5215551029623" target="_blank">
                                            +52 1 5551029623
                                        </a>
                                    </div> */}
                                    <div className="sty-link sty-uty-font-18-1">
                                        <a className="sty-uty-font-30-1 sty-color-whatsapp" href="https://wa.me/5219841900863?text=Hello%20NAW!" target="_blank">
                                            <FontAwesomeIcon icon={faWhatsappSquare} width='36' height='36' />
                                        </a>
                                        &nbsp;&nbsp;&nbsp;
                                        <a className="sty-uty-font-16-1" href="tel:+525630117152" target="_blank">
                                            +52 56 3011 7152
                                        </a>
                                    </div>
                                </div>
                                <div className="sty-section-contact">
                                    <div className="sty-title sty-uty-font-20-2">
                                        Email
                                    </div>
                                    <div className="sty-link sty-uty-font-30-1">
                                        <a href={`mailto:${links.email1}`} target="_blank">
                                            <FontAwesomeIcon icon={faEnvelope} width='36' height='36' className="sty-color-email" /> <div className="sty-social-tag sty-uty-font-16-1">info@naw.mx</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="sty-section-contact">
                                    <div className="sty-title sty-uty-font-20-2">
                                        {i18n.t('contact:social')}
                                    </div>
                                    <div className="sty-link sty-uty-font-30-1">
                                        <a href={links.facebook} target="_blank">
                                            <FontAwesomeIcon icon={faFacebook} width='36' height='36' className="sty-color-facebook" /> <div className="sty-social-tag sty-uty-font-16-1">nawexperiences</div>
                                        </a>
                                    </div>
                                    <div className="sty-link sty-uty-font-30-1">
                                        <a href={links.faceboookMessanger} target="_blank">
                                            <FontAwesomeIcon icon={faFacebookMessenger} width='36' height='36' className="sty-color-facebook" /> <div className="sty-social-tag sty-uty-font-16-1">@nawexperiences</div>
                                        </a>
                                    </div>
                                    <div className="sty-link sty-uty-font-30-1">
                                        <a href={links.instagram} target="_blank">
                                            <FontAwesomeIcon icon={faInstagram} width='36' height='36' className="sty-color-instagram" /> <div className="sty-social-tag sty-uty-font-16-1">naw.mx</div>
                                        </a>
                                    </div>
                                    <div className="sty-link sty-uty-font-30-1">
                                        <a href={links.tripadvisor} target="_blank">
                                            <FontAwesomeIcon icon={faTripadvisor} width='36' height='36' className="sty-color-tripadvisor" /> <div className="sty-social-tag sty-uty-font-16-1">Naw</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 align-self-center order-2 order-md-2 sty-resp-cont-1">

                                <Form
                                    onSubmit={this.handleForm}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }

}

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect(mapStateToProps)(Layout);
