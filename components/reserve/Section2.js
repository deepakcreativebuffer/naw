import React, {Component} from 'react';
import { connect } from 'react-redux';

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'
import set_cookies from '../../helper/cookies/set_cookies'
import get_cookies from '../../helper/cookies/get_cookies'

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'

import Steps from './Steps'
import Information from './Information'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            step: null,
            detailTour: {},
            amountCoupon: null,
            percentageCoupon: null
        }
    }

    componentDidMount(){
        this.handleInfoTour()
        autoHeightMinMiddle("class-autoheight")
    }
    componentDidUpdate(prevProps){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.handleInfoTour()
        }
    }

    handleCurrentStep = (step) => {
        this.setState({step})
    }

    handleCupon = ( amountCoupon, percentageCoupon ) => {
        this.setState({amountCoupon, percentageCoupon})
    }

    handleInfoTour = async() => {
        let {valueLanguage} = this.props
        let tourId = this.props.tourid;
     //   const idTour = get_cookies('reserveTourId')
        let data = await request(endPoints.get_adventure_detail, null, tourId, valueLanguage)
        console.log(data)
        set_cookies('receiptNameTour', data.title)
        if(data != null){
            this.setState({detailTour: data.object})
        }
    }

    render(){
        let {valueLanguage} = this.props
        let {uuid, step} = this.state
        let {detailTour} = this.state
        let {amountCoupon, percentageCoupon} = this.state
        
        return <>
            <div className="col-12 sty-reserve">
                <div className="row justify-content-center sty-content-all">
                    <div className="col-11 col-md-10">
                        <div className="row">
                            <div className="col-12 col-md-8 sty-resp-cont-1">
                                <Steps
                                    handleCurrentStep={this.handleCurrentStep}
                                    handleCupon={this.handleCupon}
                                    detailTour={detailTour}
                                    uuid={uuid}
                                />
                            </div>
                            <div className="col-12 col-md-4 sty-resp-cont-2">
                                <Information 
                                    valueLanguage={valueLanguage}
                                    detailTour={detailTour}
                                    step={step}
                                    amountCoupon={amountCoupon}
                                    percentageCoupon={percentageCoupon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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