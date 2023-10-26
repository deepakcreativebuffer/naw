import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import { links } from '../../helper/constants/links/externals'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/fontawesome-free-brands'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/fontawesome-free-brands'
import { faInstagram } from '@fortawesome/fontawesome-free-brands'
import { faTripadvisor } from '@fortawesome/fontawesome-free-brands'

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/reservation'
import { loadElement } from '../../helper/appearance/load'
import { messageAlert } from '../../helper/appearance/messageAlert'


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
                    <div className="col-12 col-md-10 text-center sty-uty-font-1-46-1">
                        <h2>OOps! No encontramos lo que buscabas</h2>
                    </div>
                    <div className="col-12 col-md-10 text-center sty-error-cont-1 sty-uty-font-1-46-1">
                        <h2>404</h2>
                    </div>
                    <div className="col-12 col-md-7 sty-error-cont-2">
                        <button className="sty-button-1 sty-button-w100 sty-uty-font-16-1" onClick={this.handleSearch}>
                            {i18n.t('button:button_error_1')}
                        </button>
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
