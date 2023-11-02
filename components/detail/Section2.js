import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from '../../routes'
import ReactStars from 'react-stars'
import { Link } from '../../routes'
import Image from 'next/image';
var slug = require('slug')

import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { autoHeightMinMiddle } from '../../helper/appearance/autoheight'
import set_cookies from '../../helper/cookies/set_cookies'

const logoTrip = "/static/img/favicons/app/tripadvisor_logo.gif"
const link1 = "https://www.tripadvisor.com.mx/Attraction_Review-g150812-d13354576-Reviews-Naw-Playa_del_Carmen_Yucatan_Peninsula.html"

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'
import { validateCalendar } from '../../helper/functions/excludeDates'
import formatHtml from '../../helper/format/formatHtml'

import Form1 from './forms/first'
import i18n from '../../helper/i18n/config';
import MoneyValue from '../main/MoneyValue';
const icon = "/static/img/favicons/app/logo.png"

const visa = "/static/img/payMethods/visa_icon.png"
const mastercard = "/static/img/payMethods/master_card_icon.png"
const americanExpress = "/static/img/payMethods/american_express_icon.png"
const bankTransfer = "/static/img/payMethods/bank_transfer_icon.png"
const oxxo = "/static/img/payMethods/oxxo_icon.png"
const paypal = "/static/img/payMethods/paypal_icon.png"

const defaultTour = {
    title: null,
    duration: null,
    destination: null,
    great: [],
    description: null,
    includes: [],
    notincludes: [],
    where: [],
    requirements: [],
    recomendations: [],
    reviews: [],
    maxCapacity: null,
    images: null,

    averagePrice: null,
    time: ['8:00'],
    flagShowGallery: true,
    timetable: null,
}

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataTour: defaultTour,
            sliders: [],
            index: 0,
            flagDate: false,

            stateDestination: null,
            stateActivity: null,
            stateTitle: null,

            height1: null,
            flagHeight: false,
            height2: null,
            prepayPorcent: null
        }
    }

    componentWillMount() {
        this.handleInformation()
    }

    componentDidMount = async () => {
        let { languageLocal } = this.props
        if (languageLocal == 'es') {
            this.props.setLanguage('es')
            i18n.changeLanguage('es')
        }
        if (languageLocal == 'en') {
            this.props.setLanguage('en')
            i18n.changeLanguage('en')
        }
        this.handleInfoPrepay();
        let component = this
        this.setState({ flagShowGallery: false })
        autoHeightMinMiddle("class-autoheight")

        document.getElementById("id-cont-gallery").addEventListener("click", (evt) => {
            const flyoutElement = document.getElementById("id-gallery-image");
            let targetElement = evt.target;
            if (flyoutElement.parentNode.classList.contains('show')) {
                do {
                    if (targetElement == flyoutElement) {

                        return;
                    }
                    targetElement = targetElement.parentNode;
                } while (targetElement);
                component.setState({ flagShowGallery: false })
            }
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            let { valueLanguage, uuid } = this.props
            let dataDetail = await request(endPoints.get_adventure_detail, null, uuid, valueLanguage)
            dataDetail = dataDetail.object
            let { destination, adventureType, title } = dataDetail
            Router.pushRoute('detail', { destination: slug(destination.name).toLowerCase(), adventure: slug(adventureType.name).toLowerCase(), tour: slug(title).toLowerCase(), uuid: uuid })
            this.handleInformation(false)
        }
        if (prevProps.uuid != this.props.uuid) {
            this.handleInformation(true)
            this.setState({ sliders: [], flagHeight: false })
        }
        if (prevState.index != this.state.index || prevState.sliders != this.state.sliders) {
            autoHeightMinMiddle("class-autoheight")
        }
        if (prevState.dataTour != this.state.dataTour) {
            let element = document.getElementById('id-show1')
            let element2 = document.getElementById('id-show2')
            if (element != null) {
                document.getElementById('id-arrow-1').classList.remove('select')
                let height = element.offsetHeight
                this.setState({ height1: height })
                element.style.height = "10em"
                document.getElementById('id-courtian1').style.height = `${80}%`
            }
            if (element2 != null) {
                document.getElementById('id-arrow-2').classList.toggle('select')
                let height2 = element2.offsetHeight
                this.setState({ height2: height2 })
                element2.style.height = "0px"
            }
        }
    }

    componentWillUnmount() {
        this.hadleReset()
    }

    hadleReset = () => {
        this.setState({
            flagHeight: false,
        })
    }

    handleInformation = async (first = true) => {
        let { valueLanguage, uuid } = this.props
        let { handleBackGround } = this.props
        let dataDetail = null
        if (typeof (window) != 'undefined')
            window.scrollTo({ 'top': 0 });
        dataDetail = await request(endPoints.get_adventure_detail, null, uuid, valueLanguage)

        dataDetail = dataDetail.object
        let { title, duration, extras, description, maxCapacity, averagePrice, images, destination, reviews,
            discount, startSeason, endSeason } = dataDetail
        let { timetable } = dataDetail

        let dataTour = Object.assign({}, defaultTour)
        if (typeof (images) != 'undefined') {
            this.handleSliders(images)
            dataTour.images = images
            if (images.length > 0) {
                handleBackGround(images[0].image)
            }
        }

        if (typeof (timetable) != 'undefined') {
            if (timetable.length > 0) {
                var array = []
                timetable.map((element, i) => {
                    array.push(element.time)
                })
                dataTour.time = array
            } else
                dataTour.time = ['10:00:00']
        }

        dataTour.title = title
        dataTour.duration = `${i18n.t('detail:tag_1')}: ${duration} ${i18n.t('reserve:hours')}`
        if (typeof (destination) != 'undefined')
            if (typeof (destination.name) != 'undefined')
                dataTour.destination = `${i18n.t('detail:tag_2')}: ${destination.name}`
        if (typeof (extras.destacado) != 'undefined')
            if (extras.destacado.length > 0)
                dataTour.great = extras.destacado.map((element, i) => {
                    let { content } = element
                    return <li key={`li_${i}`}>
                        {content}
                    </li>
                })
        dataTour.description = formatHtml(description)
        if (typeof (extras.incluye) != 'undefined')
            if (extras.incluye.length > 0)
                dataTour.includes = extras.incluye.map((element, i) => {
                    let { content } = element
                    return <li key={`li_1_${i}`}>
                        {content}
                    </li>
                })
        if (typeof (extras.noincluye) != 'undefined')
            if (extras.noincluye.length > 0)
                dataTour.notincludes = extras.noincluye.map((element, i) => {
                    let { content } = element
                    return <li key={`li_2_${i}`}>
                        {content}
                    </li>
                })
        if (typeof (extras.donde) != 'undefined')
            if (extras.donde.length > 0)
                dataTour.where = extras.donde.map((element, i) => {
                    let { title, content } = element
                    let titleWhere = ''
                    if (title != '')
                        titleWhere = `${title}:`
                    let tag = `${titleWhere} ${content}`
                    return <p key={`p_1_${i}`}>
                        {tag}
                    </p>
                })
        if (typeof (extras.requisito) != 'undefined')
            if (extras.requisito.length > 0)
                dataTour.requirements = extras.requisito.map((element, i) => {
                    let { content } = element
                    return <p key={`p_2_${i}`}>
                        {content}
                    </p>
                })
        if (typeof (extras.recomendacion) != 'undefined')
            if (extras.recomendacion.length > 0)
                dataTour.recomendations = extras.recomendacion.map((element, i) => {
                    let { content } = element
                    return <p key={`p_3_${i}`}>
                        {content}
                    </p>
                })
        if (reviews.length > 0)
            dataTour.reviews = reviews.map((element, i) => {
                let { reviewContent, avgGrade, name } = element
                var tempName = typeof (name) != 'undefined' && name != null ? name : ''
                return <div className="sty-content-review" key={`review_${i}`}>
                    <div className="sty-uty-font-1-18-2">
                        {tempName}
                    </div>
                    <div className="sty-div-1">
                        <ReactStars
                            className="sty-stars-1"
                            edit={false}
                            count={5}
                            value={parseFloat(avgGrade)}
                            size={12}
                            color2={'#00E6E6'}
                        />
                    </div>
                    <div className="sty-uty-font-1-14-1">
                        {reviewContent}
                    </div>
                </div>
            })
        dataTour.maxCapacity = i18n.t('detail:tag_3').replace('@', maxCapacity)

        if (timetable.length > 0) {
            dataTour.timetable = timetable
        } else {
            dataTour.timetable = [{
                "do": true,
                "id": 5,
                "ju": true,
                "lu": true,
                "ma": true,
                "mi": true,
                "sa": true,
                "time": "10:00:00",
                "todos": false,
                "vi": true
            }]
        }

        dataTour.averagePrice = averagePrice
        dataTour.discount = discount
        dataTour.startSeason = startSeason
        dataTour.endSeason = endSeason

        this.setState({ flagDate: validateCalendar(startSeason, endSeason) })
        this.setState({ dataTour })
    }

    handleSliders(images) {
        let sliders = []

        sliders = images.map((element, i) => {
            let { image } = element

            return <div className="sty-uti-background sty-detail-img" key={`slider_${i}`}>
                <Image layout='fill' loading="lazy" src={image} />
            </div>
        })

        this.setState({ sliders })
    }

    onChangeIndex = (index) => {
        this.setState({ index });
    }

    slideRenderer = (params) => {
        const { sliders } = this.state
        const { index, key } = params

        return <div className={'sty-silders-content'} key={key}>
            {sliders[mod(index, sliders.length)]}
        </div>
    }
    slideRendererResp = (params) => {
        const { sliders } = this.state
        const { index, key } = params

        return <div className={'sty-silders-content class-autoheight'} key={key}>
            {sliders[mod(index, sliders.length)]}
        </div>
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

    handleForm = async (form) => {
        let { valueLanguage, uuid } = this.props
        let hourDate = form.hour.split(':');
        hourDate = `${hourDate[0]}:${hourDate[1]}`

        let params = {
            adventure: uuid,
            date: form.date,
            time: hourDate,
            adventurers: form.number,
        }
        console.log('date_reserve')
        console.log(params)
        let data = await request(endPoints.post_adventure_date, params, null, valueLanguage)
        console.log('date_reserve')
        console.log(data)

        if (data != null) {
            set_cookies('reserveTourId', uuid)
            set_cookies('reserveTourDate', form.date)
            set_cookies('reserveTourHour', hourDate)
            set_cookies('reserveTourNumber', form.number)
            set_cookies('reserveTourIdDate', data.object.id)
            //  Router.pushRoute('reserve', { uuid: data.object.id } )
            Router.pushRoute(`/reservations/${data.object.id}?tour=${btoa(uuid)}&reserveD=${btoa(form.date)}&reserveH=${btoa(hourDate)}&reserveN=${btoa(form.number)}`)

        }
    }

    handleShowGallery = () => {
        this.setState({ flagShowGallery: true })
    }

    handleScroll = () => {
        let element = document.getElementById("id-reserve-resp");
        window.scrollTo({
            'behavior': 'smooth',
            'top': element.offsetTop + 250
        });
    }

    handleShow1 = (e) => {
        let { height1, flagHeight } = this.state
        let element = document.getElementById('id-show1')
        let courtain1 = document.getElementById('id-courtian1')
        let height = element.offsetHeight
        let arrow = e.currentTarget
        arrow.classList.toggle('select')
        if (!flagHeight) {
            element.style.height = `${100}%`
            courtain1.style.height = `${0}px`
        }
        else {
            element.style.height = `${15}em`
            courtain1.style.height = `${80}%`
        }
        this.setState({ flagHeight: !flagHeight })
    }

    handleShow2 = (e) => {
        let { height2 } = this.state
        let element = document.getElementById('id-show2')
        let height = element.offsetHeight
        let arrow = e.currentTarget
        arrow.classList.toggle('select')
        if (height == 0) {
            element.style.height = `${100}%`
        }
        else {
            element.style.height = `${0}px`
        }
    }
    handleShow3 = (e) => {
        let { flagHeight } = this.state
        let element = document.getElementById('id-show3')
        let courtain1 = document.getElementById('id-courtian3')
        let height = element.offsetHeight
        let arrow = e.currentTarget
        arrow.classList.toggle('select')
        if (!flagHeight) {
            element.style.height = `${100}%`
            courtain1.style.height = `${0}px`
        }
        else {
            element.style.height = `${5}em`
            courtain1.style.height = `${80}%`
        }
        this.setState({ flagHeight: !flagHeight })
    }
    handleInfoPrepay = async () => {
        let { valueLanguage, uuid } = this.props
        let data = await request(endPoints.get_adventure_detail, null, uuid, valueLanguage)
        console.log(data)
        if (data != null) {
            this.setState({ prepayPorcent: data.object.prepayPorcent })
        }
    }

    render() {
        let { dataTour } = this.state
        let { sliders, index, flagShowGallery, flagDate } = this.state
        var class1 = flagShowGallery ? 'show' : null
        var total = dataTour.averagePrice
        if (typeof (dataTour.discount) != 'undefined') {
            total = (parseFloat(total) - parseFloat(dataTour.discount)).toFixed(2)
        }
        var tranform = ''
        var tranformW = ''
        tranformW = `${sliders.length}em`
        if (mod(index, sliders.length) > 2 && mod(index, sliders.length) < (sliders.length - 3)) {
            tranform = `translateX(-${(mod(index, sliders.length) - 2)}em)`
        }
        if (sliders.length > 5)
            if (mod(index, sliders.length) >= (sliders.length - 3)) {
                tranform = `translateX(-${sliders.length - 5}em)`
            }

        return <>
            <div className={`sty-detail sty-cont-gallery sty-justify-content ${class1}`} id="id-cont-gallery">
                <div className="sty-content-slider fix-1" id="id-gallery-image">
                    <AutoPlaySwipeableViews
                        className={"sty-container-slide"}
                        index={index}
                        onChangeIndex={this.onChangeIndex}
                        enableMouseEvents
                        interval={5000}
                        slideRenderer={this.slideRenderer}
                    />
                    <div className="sty-arrow-left-slider sty-cursor" id="remove" onClick={this.handleClickSelect}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="sty-arrow-right-slider sty-cursor" id="add" onClick={this.handleClickSelect}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
            <section className="container-fluid sty-header-layout class-autoheight sty-content-show-resp sty-detail sty-swipe-resp">
                <div className="sty-uty-back-section">
                    <div className="sty-content-slider fix-2 class-autoheight">
                        {sliders.length > 0 && <>
                            <AutoPlaySwipeableViews
                                className={"sty-container-slide"}
                                index={index}
                                onChangeIndex={this.onChangeIndex}
                                enableMouseEvents
                                interval={5000}
                                slideRenderer={this.slideRendererResp}
                            />
                            <div className="sty-indicators">
                                <div className="sty-cont-indicators">
                                    <div className="sty-cont-index" style={{ transform: tranform, width: tranformW }}>
                                        {sliders.map((element, i) => {
                                            var className = 'sty-circle'
                                            if (i == mod(index, sliders.length))
                                                className = 'sty-select'
                                            if (i == mod(index, sliders.length) - 1)
                                                className = 'sty-next'
                                            if (i == mod(index, sliders.length) + 1)
                                                className = 'sty-next'
                                            return <div className={`sty-circle ${className}`} key={`indiecator_${i}`}></div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
                {/* <div className="sty-curtain-1"></div> */}
                <div className="row justify-content-center sty-uty-min-height-parent sty-uty-padding-section-1 sty-pinter-no">
                    <div className="sty-logo-resp sty-content-show-resp">
                        <Link route={'index'}>
                            <a className="sty-swipe-link">
                                <Image src={icon} width='100%' height='100%' />
                            </a>
                        </Link>
                    </div>
                    <div className="col-10 sty-justify-content">
                        <div className="text-center sty-title sty-uty-font-1-46-1">
                            {i18n.t("title:title_search")}
                        </div>
                    </div>
                </div>
            </section>
            <section className="sty-content-show-resp">
                <button className="sty-button-4 sty-button-w100 sty-uty-font-16-1" onClick={this.handleShowGallery}>
                    Ver fotos
                </button>
            </section>
            <section className="container-fluid sty-detail">
                <div className="row justify-content-center">
                    <div className="col-11 sty-content-detail">
                        <div className="row">
                            <div className="col-12 col-md-8 order-2 order-md-1" id="id-content-data">
                                <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-23-1">
                                        {`${dataTour.title}`}
                                    </div>
                                    <div className="col-12 sty-padding-sides sty-request-button-1 sty-content-show-resp">
                                        <button className="sty-button-1-1 sty-button-w100 sty-uty-font-1-20-1" onClick={this.handleScroll}>
                                            {i18n.t('button:button3')}   <MoneyValue price={total}></MoneyValue>
                                        </button>
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        <div>
                                            {dataTour.duration}
                                        </div>
                                        <div>
                                            {dataTour.destination}
                                        </div>
                                        <div>
                                            {i18n.t('reserve:bookOnly')} {this.state.prepayPorcent}% {i18n.t('reserve:inAdvance')}
                                        </div>
                                    </div>
                                </div>
                                {/* ////// */}
                                {dataTour.great.length > 0 && <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:outstanding')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        <ul>
                                            {dataTour.great}
                                        </ul>
                                    </div>
                                </div>
                                }
                                {/* ////// */}
                                <div className="sty-content-section sty-content-hidden-resp">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:description')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        {dataTour.description}
                                    </div>
                                </div>
                                <div className="sty-content-section sty-content-show-resp">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:description')}
                                    </div>
                                    <div className="sty-content-show-arrow" id="id-arrow-1" onClick={this.handleShow1}>
                                        <FontAwesomeIcon icon={faChevronDown} width='25' height='25' />
                                    </div>
                                    <div className="sty-courtain" id="id-courtian1"></div>
                                    <div className="sty-content sty-uty-font-1-15-1 sty-content-section-resp-1" id="id-show1">
                                        {dataTour.description}
                                    </div>
                                </div>
                                {/* ////// */}
                                {dataTour.includes.length > 0 && <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:includes')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        <ul>
                                            {dataTour.includes}
                                        </ul>
                                    </div>
                                </div>
                                }
                                {/* ////// */}
                                {dataTour.notincludes.length > 0 && <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:notIncludes')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        <ul>
                                            {dataTour.notincludes}
                                        </ul>
                                    </div>
                                </div>
                                }
                                {/* ////// */}
                                {dataTour.where.length > 0 && <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:where')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        {dataTour.where}
                                    </div>
                                </div>
                                }
                                {/* ////// */}
                                {dataTour.requirements.length > 0 && <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:requirements')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        {dataTour.requirements}
                                    </div>
                                </div>
                                }
                                {/* ////// */}
                                {dataTour.recomendations.length > 0 && <div className="sty-content-section sty-content-hidden-resp">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:recommendations')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        {dataTour.recomendations}
                                    </div>
                                </div>
                                }
                                {dataTour.recomendations.length > 0 && <div className="sty-content-section sty-content-show-resp">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:recommendations')}
                                    </div>
                                    <div className="sty-content-show-arrow" id="id-arrow-2" onClick={this.handleShow2}>
                                        <FontAwesomeIcon icon={faChevronDown} width='25' height='25' />
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1 sty-content-section-resp-1" id="id-show2">
                                        {dataTour.recomendations}
                                    </div>
                                </div>
                                }
                                {/* ////// */}
                                <div className="sty-content-section">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:size')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        <p>
                                            {dataTour.maxCapacity}
                                        </p>
                                    </div>
                                </div>

                                {/* ////// */}
                                <div className="sty-content-section sty-content-hidden-resp">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('reserve:cancellationPolicies')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
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
                                <div className="sty-content-section sty-content-show-resp">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('reserve:cancellationPolicies')}
                                    </div>
                                    <div className="sty-content-show-arrow" id="id-arrow-3" onClick={this.handleShow3}>
                                        <FontAwesomeIcon icon={faChevronDown} width='25' height='25' />
                                    </div>
                                    <div className="sty-courtain" id="id-courtian3"></div>
                                    <div className="sty-content sty-uty-font-1-15-1 sty-content-section-resp-1" id="id-show3">
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


                                {/* ////// */}
                                <div className="sty-content-tripadvisor">
                                    <a href={link1} target="_blank">
                                        <div className="text-center sty-quater sty-uty-font-12-1">
                                            Read reviews of Naw
                                            <hr />
                                            <div className="sty-cont-img">
                                                <img src={logoTrip} width='16' height='16' />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                {/* ////// */}
                                <script src="https://apps.elfsight.com/p/platform.js" defer></script>
                                <div class="elfsight-app-cf6c917f-5c32-49d5-a350-dc551ed69aa6"></div>
                                {/* ////// */}
                                {dataTour.reviews.length > 0 && <div className="sty-content-section sty-fix-1">
                                    <div className="sty-title sty-uty-font-1-20-1">
                                        {i18n.t('detail:reviews')}
                                    </div>
                                    <div className="sty-content sty-uty-font-1-15-1">
                                        {dataTour.reviews}
                                    </div>
                                </div>
                                }

                            </div>

                            <div className="col-12 col-md-4 order-1 order-md-2" id="id-content-info">

                                <div className="sty-cont-sticky">
                                    {flagDate && <div className="sty-content-features sty-content-hidden-resp">
                                        <div className="sty-card-features-header">
                                            <div className="sty-price text-center sty-uty-font-23-3">
                                                <MoneyValue price={total}></MoneyValue> {i18n.t('detail:perPerson')}
                                            </div>
                                        </div>
                                        <div className="sty-card-features-content">
                                            <Form1
                                                onSubmit={this.handleForm}
                                                timetable={dataTour.timetable}
                                                startSeason={dataTour.startSeason}
                                                endSeason={dataTour.endSeason}
                                                time={dataTour.time}
                                            />
                                        </div>
                                    </div>}
                                    {!flagDate && <div className="sty-content-features sty-content-hidden-resp">
                                        <div className="sty-card-features-header fix-1">
                                            <div className="sty-price text-center sty-uty-font-23-3">
                                                {i18n.t('detail:noDate')}
                                            </div>
                                        </div>
                                    </div>}
                                    {/* ////// */}
                                    <div className="payment-methods">
                                        <div>
                                            <Image width='40' height='30' src={visa} />
                                        </div>
                                        <div className="payment-methods-icons">
                                            <Image width='40' height='30' src={mastercard} />
                                        </div>
                                        <div className="payment-methods-icons">
                                            <Image width='32' height='30' src={americanExpress} />
                                        </div>
                                        <div className="payment-methods-icons">
                                            <Image width='30' height='30' src={bankTransfer} />
                                        </div>
                                        <div className="payment-methods-icons">
                                            <Image width='45' height='30' src={oxxo} />
                                        </div>
                                        <div className="payment-methods-icons">
                                            <Image width='40' height='30' src={paypal} />
                                        </div>
                                    </div>
                                    {sliders.length > 0 && <>
                                        <div className="sty-content-slider sty-content-hidden-resp">
                                            <AutoPlaySwipeableViews
                                                className={"sty-container-slide"}
                                                index={index}
                                                onChangeIndex={this.onChangeIndex}
                                                enableMouseEvents
                                                interval={5000}
                                                slideRenderer={this.slideRenderer}
                                            />
                                            <div className="sty-arrow-left-slider sty-cursor" id="remove" onClick={this.handleClickSelect}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </div>
                                            <div className="sty-arrow-right-slider sty-cursor" id="add" onClick={this.handleClickSelect}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </div>
                                        </div>
                                        <div className="sty-content-hidden-resp">
                                            <button className="sty-button-1-1 sty-button-w100 sty-uty-font-16-1" onClick={this.handleShowGallery}>
                                                Ver fotos
                                            </button>
                                        </div>
                                    </>
                                    }
                                </div>

                            </div>
                            <div className="col-12 order-3 sty-request-resp sty-content-show-resp" id="id-reserve-resp">
                                <div className="payment-methods-resp">
                                    <div>
                                        <Image width='40' height='30' loading="lazy" src={visa} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='40' height='30' loading="lazy" src={mastercard} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='32' height='30' loading="lazy" src={americanExpress} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='30' height='30' loading="lazy" src={bankTransfer} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='45' height='30' loading="lazy" src={oxxo} />
                                    </div>
                                    <div className="payment-methods-icons">
                                        <Image width='40' height='30' loading="lazy" src={paypal} />
                                    </div>
                                </div>
                                <div className="sty-cont-sticky">
                                    {flagDate && <div className="sty-content-features">
                                        <div className="sty-card-features-header">
                                            <div className="sty-price text-center sty-uty-font-23-3">
                                                <MoneyValue price={total}></MoneyValue> {i18n.t('detail:perPerson')}
                                            </div>
                                        </div>
                                        <div className="sty-card-features-content">
                                            <Form1
                                                onSubmit={this.handleForm}
                                                timetable={dataTour.timetable}
                                                startSeason={dataTour.startSeason}
                                                endSeason={dataTour.endSeason}
                                                time={dataTour.time}
                                            />
                                        </div>
                                    </div>}
                                    {!flagDate && <div className="sty-content-features">
                                        <div className="sty-card-features-header fix-1">
                                            <div className="sty-price text-center sty-uty-font-23-3">
                                                {i18n.t('detail:noDate')}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (stateLanguage) => {
            dispatch({ type: 'STATE_LANGUAGE', stateLanguage });
        },
        setIdReserve: (stateIdReserveTour) => {
            dispatch({ type: 'STATE_ID_RESERVER', stateIdReserveTour });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);