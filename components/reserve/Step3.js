import React, {Component} from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Router } from '../../routes'
import i18n from '../../helper/i18n/config';

import Form3 from './form/FormStep3'

import get_cookies from '../../helper/cookies/get_cookies'
import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/reservation'
import {loadElement} from '../../helper/appearance/load'
import {messageAlert_url} from '../../helper/appearance/messageAlert'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            adventures: null,
            elementsAdventures: [],

            stripeElement: null,
            cardElement: null,
            tokenStripe: null,

            dataForm3: null,
            cuppon: null,
        }
    }

    componentDidMount(){
        if (typeof window !== "undefined") {
           let search = window.location.search;
           let params = new URLSearchParams(search);
           let adventures = atob(params.get('reserveN'));
         //   let adventures = get_cookies('reserveTourNumber')
            this.setState({adventures})
        }
       
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.dataForm2!=this.props.dataForm2){
            this.handleNameAdventure()
        }

        if(prevState.tokenStripe!=this.state.tokenStripe){
            this.handleSendPost(this.state.tokenStripe)
        }
    }

    handleNameAdventure = () => {
        let {dataForm2} = this.props

        let elementsAdventures = []
        elementsAdventures.push(<li key={`adventure_0`}>{dataForm2.name} {dataForm2.last}</li>)
        if(typeof(dataForm2.adventure)!='undefined'){
            let elementsAdventuresTemp = dataForm2.adventure.map((element, i) => {
                let {firstName, lastName} = element
                if(typeof(firstName)=='undefined')
                return <li key={`adventure_${i}`}>
                    {`{ ${i18n.t('reserve:undefined')} }`}
                </li>

                return <li key={`adventure_${i}`}>
                    {firstName} {lastName}
                </li>
            })
            elementsAdventures = elementsAdventures.concat(elementsAdventuresTemp)
        }

        this.setState({elementsAdventures})
    }
    
    handleInitStripe = (stripeElement, cardElement) => {
        this.setState({stripeElement, cardElement})
    }

    handleCoupon = (cuppon, discount, percentage) => {
        let {handleCupon} = this.props
        handleCupon(discount, percentage)
        this.setState({cuppon})
    }

    handleForm = (form) => {
        let {stripeElement, cardElement} = this.state
        let component = this
        this.setState({dataForm3: form})

        stripeElement.createToken(cardElement).then(function(result) {
            if (result.error) {
                // Inform the customer that there was an error.
                toast(`${result.error.message}`, {
                    className: 'toast-background',
                    closeButton: false,
                    autoClose: 5000
                });
                // var errorElement = document.getElementById('card-errors');
                // errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                console.log(result.token);
                component.setState({tokenStripe: result.token})
            } 
        })
    }

    handleSendPost = async(tokenStripe) => {
        let {valueLanguage} = this.props
        let {dataForm3, cuppon} =  this.state
        let idReservation = get_cookies('IdReservation')
        let flagSubscribe = true
        if(typeof(dataForm3.flagNewsletter)!='undefined'){
            flagSubscribe = dataForm3.flagNewsletter
        }

        if(idReservation!='#'){
            let paramsPay = {
                "subscribe": false,
                "name_on_card": dataForm3.name,
                "accept_terms": false,
	            "full_payment": false,
	            "token": tokenStripe.id
            }
            if(cuppon!=null)
            paramsPay['coupon'] = cuppon

            console.log('pay')
            console.log(paramsPay)
            let dataPay = await request(endPoints.post_reservation_pay, paramsPay, idReservation, valueLanguage, false)
            console.log('pay_res')
            console.log(dataPay)

            if(dataPay==null){
                let dataPayRe = await request(endPoints.post_reservation_pay, paramsPay, idReservation, valueLanguage)
                console.log('pay_res')
                console.log(dataPayRe)
                if(dataPayRe!=null){
                    loadElement(true)
                    messageAlert_url('mesage_2', 'reserveSuccess')
                }
            }
            if(dataPay!=null){
                loadElement(true)
                messageAlert_url('mesage_2', 'reserveSuccess')
            }
        }
    }

    render(){
        let {uuid, activeTab, detailTour} = this.props
        let {adventures, elementsAdventures} = this.state
        
        return <>
            <div className="row">
                <div className="col-12">
                    <div className="sty-uty-font-30-3 sty-title-section">
                        {i18n.t('reserve:3pay')}
                    </div>
                    <div className="sty-uty-font-18-1">
                        <div className="sty-title-form">
                            {adventures} {i18n.t('reserve:adventurer_1')}
                        </div>
                        <div className="sty-uty-font-15-1">
                            <ul>
                                {elementsAdventures}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <hr/>
                </div>
                {Object.keys(detailTour).length!=0&&
                    <Form3
                        handleInitStripe={this.handleInitStripe}
                        handleCoupon={this.handleCoupon}
                        activeTab={activeTab}
                        onSubmit={this.handleForm}
                        uuid={uuid}
                        detailTour={detailTour}
                    />
                }
            </div>
        </>
    }
    
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( Layout );