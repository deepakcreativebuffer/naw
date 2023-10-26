import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from '../../routes'
import i18n from '../../helper/i18n/config';
import ReactStars from 'react-stars'
import Image from 'next/image';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));
var slug = require('slug')

import endPoints from '../../helper/core_services/endpoints/adventure'
import request from '../../helper/core_services/core/requestService'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import MoneyValue from '../main/MoneyValue';

const temp = '/static/img/temp/3.webp'
const incon1 = '/static/img/favicons/tour/mark.svg'
const incon2 = '/static/img/favicons/tour/mask.svg'
const incon3 = '/static/img/favicons/tour/clock.svg'

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            valueLanguageState: 'es',
            elementsPopular: [],
            elementsPopularMore: [],
            index: 0,
            sliders: null,
            flagShowMore: true,
        }
    }

    componentDidMount() {
        this.handlePopulars()
        this.handleSlide()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.setState({ valueLanguageState: this.props.valueLanguage })
            this.setState({ valueLanguage: this.props.valueLanguage })
            this.setState({ sliders: null })
            this.handlePopulars()
            this.handleSlide()
        }
    }

    handlePopulars = async () => {
        let { valueLanguage } = this.props

        let resultPopular = await request(endPoints.get_adventure_popular, null, null, valueLanguage)
        let dataPopular = []
        if (resultPopular != null)
            dataPopular = resultPopular.objects
        let elementsPopular = []
        let elementsPopularMore = []

        dataPopular.map((element, i) => {
            let { id, image, title, averagePrice, destination, adventureType, duration,
                score, discount } = element
            var price = null
            var afterPrice = null
            if (parseInt(discount) > 0) {
                price = (parseFloat(averagePrice) - parseFloat(discount)).toFixed(2)
                afterPrice = parseFloat(averagePrice).toFixed(2)
            } else {
                price = parseFloat(averagePrice).toFixed(2)
            }

            let nameDestination = typeof (destination.name) == 'undefined' ? null : destination.name
            let nameAdventure = typeof (adventureType.name) == 'undefined' ? null : adventureType.name

            let elementTour = <div className="col-12 col-md-3 sty-content-card-1 margin-1" key={`destination_${i}`}>
                <Link route={"detail"} params={{ destination: slug(nameDestination).toLowerCase(), adventure: slug(nameAdventure).toLowerCase(), tour: slug(title).toLowerCase(), uuid: id }}>
                    <a>
                        <div className="sty-content-all col-12">
                            <div className="row">
                                <div className="col-5 col-md-12 sty-content-picture">
                                    <div className="sty-uty-back-section">
                                    <Image  src={image} layout='fill' loading="lazy" />
                                    </div>
                                    <div className="text-right sty-uty-font-15-1 sty-price sty-content-hidden-resp">
                                        {afterPrice != null && <div className="sty-discount sty-uty-font-10-1">
                                            <MoneyValue price={afterPrice}></MoneyValue>
                                        </div>}
                                        <MoneyValue price={price}></MoneyValue>
                                        {i18n.t('search:perPerson')}
                                    </div>
                                </div>
                                <div className="col-7 col-md-12 sty-cont-data">
                                    <div className="sty-title sty-uty-font-1-14-2">
                                        {title}
                                    </div>
                                    <div className="sty-hr"></div>
                                    <div className="sty-content-features">
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                                <img src={incon1} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {nameDestination}
                                            </div>
                                        </div>
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                            <img src={incon2} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {nameAdventure}
                                            </div>
                                        </div>
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                            <img src={incon3} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {`${duration} ${i18n.t('search:hours')}`}
                                            </div>
                                        </div>
                                        <div className="sty-cont-starts">
                                            <ReactStars
                                                className="sty-stars-1"
                                                edit={false}
                                                count={5}
                                                value={parseFloat(score)}
                                                size={12}
                                                color2={'#00E6E6'}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right sty-uty-font-12-1 sty-price sty-content-show-resp">
                                        {afterPrice != null && <div className="sty-discount sty-uty-font-10-1">
                                            <MoneyValue price={afterPrice}></MoneyValue>
                                        </div>}
                                        <MoneyValue price={price}></MoneyValue><br />
                                        {i18n.t('search:perPerson')}
                                    </div>
                                </div>
                                <div className="sty-content-buttton sty-content-hidden-resp">
                                    <button className="sty-button-2">
                                        {i18n.t("button:button2")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>

            if (i > 2) elementsPopularMore.push(elementTour)
            else elementsPopular.push(elementTour)
        })

        this.setState({ elementsPopular, elementsPopularMore })
    }

    handleSlide = async () => {
        let { valueLanguage } = this.props

        let resultPopular = await request(endPoints.get_adventure_popular, null, null, valueLanguage)
        let dataPopular = resultPopular.objects
        let tempArray = []
        let resultArray = []
        let cont = 0

        dataPopular.map((element, i) => {
            let { id, image, title, averagePrice, destination, adventureType, duration,
                score, discount } = element
            var price = null
            var afterPrice = null
            if (parseInt(discount) > 0) {
                price = (parseFloat(averagePrice) - parseFloat(discount)).toFixed(2)
                afterPrice = parseFloat(averagePrice).toFixed(2)
            } else {
                price = parseFloat(averagePrice).toFixed(2)
            }

            let nameDestination = typeof (destination.name) == 'undefined' ? null : destination.name
            let nameAdventure = typeof (adventureType.name) == 'undefined' ? null : adventureType.name

            tempArray.push(<div className="col-12 col-md-3 sty-content-card-1 margin-1" key={`destination_${i}`}>
                <Link route={"detail"} params={{ destination: slug(nameDestination).toLowerCase(), adventure: slug(nameAdventure).toLowerCase(), tour: slug(title).toLowerCase(), uuid: id }}>
                    <a>
                        <div className="sty-content-all col-12">
                            <div className="row">
                                <div className="col-4 col-md-12 sty-content-picture">
                                    <div className="sty-uty-back-section">
                                        <Image src={image} layout='fill' loading="lazy"/>
                                    </div>
                                    <div className="text-right sty-uty-font-15-1 sty-price sty-content-hidden-resp">
                                        {afterPrice != null &&
                                            <div className="sty-discount sty-uty-font-10-1">
                                                <MoneyValue price={afterPrice}></MoneyValue>
                                            </div>}
                                        <MoneyValue price={price}></MoneyValue>
                                        <br />
                                        {i18n.t('search:perPerson')}
                                    </div>
                                </div>
                                <div className="col-8 col-md-12 sty-cont-data">
                                    <div className="sty-title sty-uty-font-16-1">
                                        {title}
                                    </div>
                                    <div className="sty-hr"></div>
                                    <div className="sty-content-features">
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                            <img src={incon1} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {nameDestination}
                                            </div>
                                        </div>
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                            <img src={incon2} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {nameAdventure}
                                            </div>
                                        </div>
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                            <img src={incon3} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {`${duration} ${i18n.t('search:hours')}`}
                                            </div>
                                        </div>
                                        <div className="sty-cont-starts">
                                            <ReactStars
                                                className="sty-stars-1"
                                                edit={false}
                                                count={5}
                                                value={parseFloat(score)}
                                                size={12}
                                                color2={'#00E6E6'}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right sty-uty-font-15-1 sty-price sty-content-show-resp">
                                        {afterPrice != null && <div className="sty-discount sty-uty-font-10-1">
                                            <MoneyValue price={afterPrice}></MoneyValue>
                                        </div>}
                                        <MoneyValue price={price}></MoneyValue>
                                        <br />
                                        {i18n.t('search:perPerson')}
                                    </div>
                                </div>
                                <div className="sty-content-buttton sty-content-hidden-resp">
                                    <button className="sty-button-2">
                                        {i18n.t("button:button2")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
            )

            if (cont == 3 || (dataPopular.length - 1) == i) {
                resultArray.push(<div className="row">
                    {tempArray}
                </div>)
                cont = 0
                tempArray = []
            } else {
                cont++;
            }

        })

        this.setState({ sliders: resultArray })
    }

    onChangeIndex = (index) => {
        this.setState({ index });
    }

    handleClickSelect = (e) => {
        const { index } = this.state
        let direction = e.currentTarget.id
        let tempindex = index
        if (direction == "add")
            tempindex = tempindex + 1
        if (direction == "remove")
            tempindex = tempindex - 1
        this.setState({ index: tempindex })
    }

    slideRenderer = (params) => {
        const { sliders } = this.state
        const { index, key } = params

        return <div className={'col-12'} key={key}>
            {sliders[mod(index, sliders.length)]}
        </div>
    }

    handleShow = () => {
        let { elementsPopular, elementsPopularMore } = this.state
        let elementsPopularMoreTemp = elementsPopularMore
        let elementsPopularTemp = elementsPopular
        let addEle = elementsPopularMoreTemp.splice(0, 3)
        elementsPopularTemp = elementsPopularTemp.concat(addEle)
        this.setState({ elementsPopular: elementsPopularTemp })
        if (elementsPopularMoreTemp.length == 0)
            this.setState({ flagShowMore: false })
    }

    render() {
        const { index, sliders } = this.state
        let { elementsPopular, flagShowMore } = this.state

        return <>
            <section className="container-fluid sty-home sty-uty-padding-section-1">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="text-center sty-uty-font-1-30-1 sty-section-2-1">
                                    {i18n.t("home:tag4_1")}
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center sty-section-2-2">
                            <div className="col-12">
                                <div className="row sty-content-show-resp">
                                    {elementsPopular}
                                    {(flagShowMore && elementsPopular.length > 2) && <div className="sty-margin-button-1" onClick={this.handleShow}>
                                        <button className="sty-button-1 sty-button-w100 sty-uty-font-20-2">
                                            {i18n.t('button:button_show_2')}
                                        </button>
                                    </div>
                                    }
                                </div>
                                {(sliders != null) &&
                                    <div className="sty-content-slider sty-content-hidden-resp">
                                        <AutoPlaySwipeableViews
                                            className={"sty-cont-report-slide"}
                                            index={index}
                                            // onChangeIndex={this.onChangeIndex}
                                            enableMouseEvents
                                            interval={2000000}
                                            slideRenderer={this.slideRenderer}
                                        />
                                        <div className="sty-content-arrows">
                                            <div className="sty-arrow-left-slider sty-cursor sty-uty-font-18-1" id="remove" onClick={this.handleClickSelect}>
                                                <FontAwesomeIcon icon={faArrowLeft} width='20' height='20' />
                                            </div>
                                            <div className="sty-arrow-right-slider sty-cursor sty-uty-font-18-1" id="add" onClick={this.handleClickSelect}>
                                                <FontAwesomeIcon icon={faArrowRight} width='20' height='20'/>
                                            </div>
                                        </div>
                                    </div>
                                }
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