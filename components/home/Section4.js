import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from '../../routes'
import i18n from '../../helper/i18n/config';
import Image from 'next/image';
var slug = require('slug')

import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const temp = '/static/img/temp/2.webp'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            elementsDestination: [],
            index: 0,
            sliders: null,
            slidersResp: null,
        }
    }

    componentDidMount(){
        this.handleSlide()
        this.handleSlideResp()
    }

    handleSlide  = async() => {
        let {dataDestination} = this.props
        let tempArray = []
        let resultArray = []
        let cont = 0

        dataDestination.map((element, i) => {
            let {name, image} = element

            image = typeof(image)=='undefined'?temp:image
            tempArray.push(<div className="col-12 col-md-3 sty-col-1" key={`destination_${i}`}>
                <Link route={"searchDestination"} params={{destination: slug(name).toLowerCase() }}>
                <a>
                    <div className="sty-content-destination sty-justify-content">
                        <div className="sty-tag sty-uty-font-30-2 text-center">
                            {name}
                        </div>
                        <div className="sty-content-pic">
                            <div className="sty-uty-back-section">
                            <Image  src={image} layout='fill' loading="lazy" />
                            </div>
                        </div>
                        <div className="fade"></div>
                    </div>
                </a>
                </Link>
            </div>)

            if(cont==7||(dataDestination.length-1)==i){
                resultArray.push(<div className="row" key={`desti_parent_${i}`}>
                    {tempArray}
                </div>)
                cont = 0
                tempArray = []
            }else{
                cont++;
            }

        })

        this.setState({sliders: resultArray})
    }

    handleSlideResp  = async() => {
        let {dataDestination} = this.props
        let tempArray = []
        let resultArray = []
        let cont = 0

        dataDestination.map((element, i) => {
            let {name, image} = element

            image = typeof(image)=='undefined'?temp:image
            tempArray.push(<div className="sty-col-1" key={`destination_${i}`}>
                <Link route={"searchDestination"} params={{destination: slug(name).toLowerCase() }}>
                <a>
                    <div className="sty-content-destination sty-justify-content">
                        <div className="sty-tag sty-uty-font-30-2 text-center">
                            {name}
                        </div>
                        <div className="sty-content-pic">
                            <div className="sty-uty-back-section">
                            <Image src={image} layout='fill' loading="lazy" />
                            </div>
                        </div>
                        <div className="fade"></div>
                    </div>
                </a>
                </Link>
            </div>)

            if(cont==1||(dataDestination.length-1)==i){
                resultArray.push(<div className="sty-card-swi-2" key={`dest_parent_${i}`}>
                    {tempArray}
                </div>)
                cont = 0
                tempArray = []
            }else{
                cont++;
            }

        })

        this.setState({slidersResp: resultArray})
    }

    onChangeIndex = (index) => {
        this.setState({index});
    }

    handleClickSelect = (e) => { 
        const { index } = this.state
        let direction = e.currentTarget.id
        let tempindex = index
        if (direction=="add")
            tempindex = tempindex+1
        if (direction=="remove")
            tempindex = tempindex-1
        this.setState({index: tempindex})
    }

    slideRenderer = (params) => {
        const { sliders } = this.state
        const { index, key } = params

        return <div className={'col-12'} key={key}>
            { sliders[ mod(index, sliders.length ) ] }
        </div>
    }

    render(){
        let {index, sliders, slidersResp} = this.state

        return <>
        <section className="container-fluid sty-home sty-uty-padding-section-1">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="text-center sty-uty-font-1-30-1 sty-section-2-1">
                                {i18n.t("home:tag3_1")}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center sty-section-2-2">
                        <div className="scrolling-wrapper-flexbox-2 sty-content-show-resp">
                            {slidersResp}
                        </div>
                        <div className="col-12">
                            {/* <div className="row">

                                {elementsDestination}

                            </div> */}
                            {sliders!=null&&<div className="sty-content-slider sty-content-hidden-resp">
                                <AutoPlaySwipeableViews
                                    className={"sty-cont-report-slide"}
                                    index={index}
                                    // onChangeIndex={this.onChangeIndex}
                                    enableMouseEvents
                                    interval={20000}
                                    slideRenderer={this.slideRenderer}
                                />
                                <div className="sty-content-arrows">
                                    <div className="sty-arrow-left-slider sty-cursor sty-uty-font-18-1" id="remove" onClick={this.handleClickSelect}>
                                        <FontAwesomeIcon icon={faArrowLeft} width='20' height='20'/>
                                    </div>
                                    <div className="sty-arrow-right-slider sty-cursor sty-uty-font-18-1" id="add" onClick={this.handleClickSelect}>
                                        <FontAwesomeIcon icon={faArrowRight} width='20' height='20'/>
                                    </div>
                                </div>
                            </div>}
                            {/* {slidersResp!=null&&<div className="sty-content-slider sty-content-show-resp">
                                <AutoPlaySwipeableViews
                                    className={"sty-cont-report-slide"}
                                    // index={index}
                                    // onChangeIndex={this.onChangeIndex}
                                    enableMouseEvents
                                    interval={2000000}
                                    slideRenderer={this.slideRendererResp}
                                />
                                <div className="sty-content-arrows-res sty-left">
                                    <div className="sty-cursor sty-uty-font-18-1">
                                        <FontAwesomeIcon icon={faChevronLeft}/>
                                    </div>
                                </div>
                                <div className="sty-content-arrows-res sty-right">
                                    <div className="sty-cursor sty-uty-font-18-1">
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                    </div>
                                </div>
                            </div>} */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    }
    
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( Layout );