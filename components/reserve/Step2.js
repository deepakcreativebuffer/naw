import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import set_cookies from '../../helper/cookies/set_cookies'
import get_cookies from '../../helper/cookies/get_cookies'

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/reservation'

import Form2 from './form/FormStep2'

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            detailTour: null
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.detailTour != this.props.detailTour) {
            this.setState({ detailTour: this.props.detailTour })
        }
    }

    handleForm = async (form) => {
        let { detailTour } = this.state
        let { valueLanguage } = this.props
        let { handleChangeStep, handleChangeForm2 } = this.props
        let paramsReserv;
        if (typeof window !== "undefined") {

            let search = window.location.search;
            let params = new URLSearchParams(search);

            paramsReserv = {
                ownerName: form.name,
                ownerEmail: form.email,
                adventureDate: parseInt(get_cookies('reserveTourIdDate')),
                //   numberOfAdventurers: parseInt(get_cookies('reserveTourNumber')),
                numberOfAdventurers: parseInt(atob(params.get('reserveN'))),
                hotelOrAirbnbAdress: null,
                sendAddressLater: true,
                suitSize: null,
                guests: []
            }
        }
        if (detailTour.pickup) {
            paramsReserv['hotelOrAirbnbAdress'] = typeof (form.hotelOrAirbnbAdress) != 'undefined' ? form.hotelOrAirbnbAdress : ''
            paramsReserv['sendAddressLater'] = typeof (form.sendAddressLater) != 'undefined' ? form.sendAddressLater : false
        }
        if (detailTour.sizes) {
            paramsReserv['suitSize'] = typeof (form.suitSize) != 'undefined' ? form.suitSize : ''
        }
        let tempGuest = []
        let first = { firstName: form.name, lastName: form.last, email: form.email }
        if (typeof (form.phone) != 'undefined') {
            first['phone'] = form.phone.replace(/\D/g, "")
        }
        tempGuest.push(first)
        if (typeof (form.adventure) != 'undefined') {
            form.adventure.map((element, i) => {
                let { firstName, lastName } = element

                if (typeof (firstName) != 'undefined' && typeof (lastName) != 'undefined')
                    tempGuest.push(element)
            })
        }
        paramsReserv['guests'] = tempGuest

        console.log('reservation')
        console.log(form)
        console.log(paramsReserv)
        let dataReserve = await request(endPoints.post_reservation, paramsReserv, null, valueLanguage)
        console.log('reservation_res')
        console.log(dataReserve)

        set_cookies('IdReservation', '#')
        if (dataReserve != null)
            set_cookies('IdReservation', dataReserve.object.id)

        handleChangeForm2(form)
        handleChangeStep(3)
    }

    render() {
        let { detailTour } = this.state

        return <>
            <div className="row">
                <div className="col-12">
                    <div className="sty-uty-font-30-3 sty-title-section">
                        {i18n.t('reserve:2travels')}
                    </div>
                    {detailTour != null &&
                        <Form2
                            onSubmit={this.handleForm}
                            detailTour={detailTour}
                        />
                    }
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