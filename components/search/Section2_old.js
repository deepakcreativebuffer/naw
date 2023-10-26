import React, {Component} from 'react';
import { Modal,  ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from '../../routes';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ReactStars from 'react-stars'
import i18n from '../../helper/i18n/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import {isMobile} from 'react-device-detect';
import Image from 'next/image';
var slug = require('slug')

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'
import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'

const load = '/static/img/favicons/app/load.gif'
const incon1 = '/static/img/favicons/tour/mark.svg'
const incon2 = '/static/img/favicons/tour/mask.svg'
const incon3 = '/static/img/favicons/tour/clock.svg'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            resultSearch: [],
            elementsSearch: [],
            contAllPage: null,
            contPage: null,
            selectDestination: null,
            selectAdventure: null,
            loadState: false,

            dataAdventure: [],
            dataActivity: [],

            flagSearch: false,
            openDestination: false,
            openAdventure: false,
            openActivities: false,
            elementFilterDestination: null,
            selectFilterDestination: [],
            selectFilterDestinationEle: [],
            elementFilterAdventure: null,
            selectFilterAdventure: [],
            selectFilterAdventureEle: [],
            elementFilterActivity: null,
            selectFilterActivity: [],
            selectFilterActivityEle: [],

            modal: false,
        }
    }

    componentWillMount = async() => {
        this.handleFilterDestination()
        this.handleFilterAdventure()
        this.handleFilterActivity()
    }

    componentDidMount(){
        this.handleFirtSearch()
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.valueLanguage != this.props.valueLanguage){
            let {flagSearch} = this.state
            let {selectFilterAdventure} = this.state
            this.handleElements(true, 0, flagSearch, false)
            // this.handleFilterAdventure()
            // this.setState({selectFilterAdventureEle:this.handleFilterAdventureElements(selectFilterAdventure)})
            this.handleChangeLangActivityTitle()
        }
        if(prevProps.nameDestination != this.props.nameDestination
        || prevProps.nameAdventure != this.props.nameAdventure
        || prevProps.nameActivity != this.props.nameActivity){
            this.handleFirtSearch()
            this.setState({flagSearch: false})
        }
        if(prevState.elementsSearch!=this.state.elementsSearch){
            var scrollDiv = document.getElementById("id-button");
            var navBar = document.getElementById("id-barNav").offsetHeight;
            var divOffset = this.offset(scrollDiv);
            // window.scrollTo({ top: divOffset.top-navBar, behavior: 'smooth'});
        }
    }

    offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    handleFilterDestination = () => {
        let {dataDestination} = this.props
        let elementFilterDestination = []
        let temp = []
        let limit = parseInt(dataDestination.length/2)

        dataDestination.map((element, i) => {
            let {id, name} = element
            temp.push (<div className="sty-uty-font-14-1" key={`dest_${i}`}>
                <input type="checkbox" id={`des-${id}`} value={`${name}`} onClick={this.handleSelectDestination}/> {name}
            </div> )

            if(i == limit || i == dataDestination.length - 1){
                elementFilterDestination.push(<div className="col-6 sty-col" key={`dest_parent_${i}`}>
                    {temp}
                </div>)
                temp = []
            }

            return null
        })

        this.setState({elementFilterDestination})
    }

    handleFilterAdventure = async() => {
        let {valueLanguage} = this.props
        let resultAdventure = await request(endPoints.get_categories, null, null, valueLanguage)
        let dataAdventure = resultAdventure.objects
        let elementFilterAdventure = []
        let temp = []
        let limit = parseInt(dataAdventure.length/2)

        dataAdventure.map((element, i) => {
            let {id, name} = element
            temp.push (<div className="sty-uty-font-14-1" key={`adventure_${i}`}>
                <input type="checkbox" id={`adv-${id}`} value={`${name}`} onClick={this.handleSelectAdventure}/> {name}
            </div> )

            if(i == limit || i == dataAdventure.length - 1){
                elementFilterAdventure.push(<div className="col-6 sty-col" key={`adventure_parent_${i}`}>
                    {temp}
                </div>)
                temp = []
            }

            return null
        })

        this.setState({elementFilterAdventure, dataAdventure})
    }
    
    handleFilterActivity = async() => {
        let {valueLanguage} = this.props
        let resultActivity = await request(endPoints.get_adventure_type, null, null, valueLanguage)
        let dataActivity = resultActivity.objects
        let elementFilterActivity = []
        let temp = []
        let limit = parseInt(dataActivity.length/2)

        dataActivity.map((element, i) => {
            let {id, name} = element
            temp.push (<div className="sty-uty-font-14-1" key={`adventure_${i}`}>
                <input type="checkbox" id={`act-${id}`} value={`${name}`} onClick={this.handleSelectActivity}/> {name}
            </div> )

            if(i == limit || i == dataActivity.length - 1){
                elementFilterActivity.push(<div className="col-6 sty-col" key={`adventure_parent_${i}`}>
                    {temp}
                </div>)
                temp = []
            }

            return null
        })

        this.setState({elementFilterActivity, dataActivity})
    }

    toogleDestinatio = () => {
        let {openDestination} = this.state
        this.setState({openDestination: !openDestination})
    }

    toogleAdventure = () => {
        let {openAdventure} = this.state
        this.setState({openAdventure: !openAdventure})
    }

    toogleActivity = () => {
        let {openActivities} = this.state
        this.setState({openActivities: !openActivities})
    }

    handleFirtSearch = async() => {
        let {valueLanguage, dataDestination, 
            nameDestination, nameAdventure, nameActivity, handleNameActivity, handlePicActivity} = this.props
        ///
        let resultAdventureEs = await request(endPoints.get_categories, null, null, 'es')
        let resultAdventureEn = await request(endPoints.get_categories, null, null, 'en')
        let dataAdventureEs = resultAdventureEs.objects
        let dataAdventureEn = resultAdventureEn.objects
        let resultActivityEs = await request(endPoints.get_adventure_type, null, null, 'es')
        let resultActivityEn = await request(endPoints.get_adventure_type, null, null, 'en')
        let dataActivityEs = resultActivityEs.objects
        let dataActivityEn = resultActivityEn.objects
        let knowLang = 'es'

        let selectDestination = null
        let selectAdventure = null
        let selectActivity = null
        if(nameDestination!=null){
            let result = dataDestination.filter(obj => {
                return slug(obj.name).toLowerCase() === nameDestination
            })
            selectDestination = result.length>0?result[0].id:null
        }
        if(nameAdventure!=null){
            let resultEs = dataAdventureEs.find(obj => {
                return slug(obj.name).toLowerCase() === nameAdventure
            })
            let resultEn = dataAdventureEn.find(obj => {
                return slug(obj.name).toLowerCase() === nameAdventure
            })
            let result = null
            if(typeof(resultEs)!='undefined'){
                result = resultEs
                knowLang= 'es'
            }
            if(typeof(resultEn)!='undefined'){
                result = resultEn
                knowLang= 'en'
            }
            selectAdventure = result.id
        }
        if(nameActivity!=null){
            let resultEs = dataActivityEs.find(obj => {
                return slug(obj.name).toLowerCase() === nameActivity
            })
            let resultEn = dataActivityEn.find(obj => {
                return slug(obj.name).toLowerCase() === nameActivity
            })
            let result = null
            if(typeof(resultEs)!='undefined'){
                result = resultEs
                knowLang= 'es'
            }
            if(typeof(resultEn)!='undefined'){
                result = resultEn
                knowLang= 'en'
            }
            console.log('gygy')
            console.log(result.image)
            handleNameActivity(result.name)
            handlePicActivity(result.image)
            selectActivity = result.id
        }
        this.props.setLanguage(knowLang)
        this.state['selectDestination'] = selectDestination
        this.state['selectAdventure'] = selectAdventure
        this.state['selectActivity'] = selectActivity
        // previously selected
        if(selectDestination!=null){
            document.getElementById(`des-${selectDestination}`).click()
        }
        if(selectAdventure!=null){
            setTimeout(function(){
                document.getElementById(`adv-${selectAdventure}`).click()
            }, 300)
        }
        if(selectActivity!=null){
            setTimeout(function(){
                document.getElementById(`act-${selectActivity}`).click()
            }, 100)
        }
        this.handleElements(true, 0, false)
    }

    handleChangeLangActivityTitle = async() => {
        let {valueLanguage, handleNameActivity} = this.props
        let {selectActivity} = this.state

        let resultActivity = await request(endPoints.get_adventure_type, null, null, valueLanguage)
        let dataActivity = resultActivity.objects

        if (resultActivity!=null){
            let result = dataActivity.filter(obj => {
                return obj.id === parseInt(selectActivity)
            })
            handleNameActivity(result.length>0?result[0].name:null)
        }
    }

    handleElements  = async(fistflag, page, flagSearch, showMore=false) => {
        let {elementsSearch} = this.state
        let resultSearch = await this.handleSearch(fistflag, page, flagSearch)

        let elementsSearchNew = resultSearch.map((element,i) => {
            let {id, image, title, averagePrice, destination, adventureType, duration,
                score, discount} = element
            var price = null
            var afterPrice = null
            if(parseInt(discount)>0){
                price = (parseFloat(averagePrice)-parseFloat(discount)).toFixed(2)
                afterPrice = parseFloat(averagePrice).toFixed(2)
            }else{
                price = parseFloat(averagePrice).toFixed(2)
            }

            let nameDestination = typeof(destination.name)=='undefined'?null:destination.name
            let nameAdventure = typeof(adventureType.name)=='undefined'?null:adventureType.name

            return <div className="col-12 col-md-4 sty-content-card-1" key={`result_${i}`}>
                <Link route={"detail"} params={{destination:slug(nameDestination).toLowerCase(), adventure:slug(nameAdventure).toLowerCase(), tour:slug(title).toLowerCase(), uuid:id}}>
                <a>
                    <div className="sty-content-all col-12">
                        <div className="row">
                            <div className="col-5 col-md-12 sty-content-picture">
                                <div className="sty-uty-back-section">
                                <Image  src={image} layout='fill' loading="lazy" />
                                </div>
                                <div className="text-right sty-uty-font-15-1 sty-price sty-content-hidden-resp">
                                    {afterPrice!=null&&<div className="sty-discount sty-uty-font-10-1">
                                    <MoneyValue price={afterPrice}></MoneyValue>
                                    </div>}
                                    <MoneyValue price={price}></MoneyValue><br/>
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
                                            <img src={incon1}  width='16' height='16'/>
                                        </div>
                                        <div className="sty-uty-font-12-1 sty-tag">
                                            {nameDestination}
                                        </div>
                                    </div>
                                    <div className="sty-feature">
                                        <div className="sty-icon">
                                            <img src={incon2}  width='16' height='16'/>
                                        </div>
                                        <div className="sty-uty-font-12-1 sty-tag">
                                            {nameAdventure}
                                        </div>
                                    </div>
                                    <div className="sty-feature">
                                        <div className="sty-icon">
                                            <img src={incon3}  width='16' height='16'/>
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
                                    {afterPrice!=null&&<div className="sty-discount sty-uty-font-10-1">
                                    <MoneyValue price={afterPrice}></MoneyValue>
                                    </div>}
                                    <MoneyValue price={price}></MoneyValue><br/>
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
        })

        if(resultSearch.length==0){
            elementsSearchNew = <div className="col-12 text-center sty-uty-font-16-2">
                {i18n.t('search:coincidence')}
            </div>
        }

        if(!showMore)
        this.setState({elementsSearch: elementsSearchNew})
        if(showMore)
        this.setState({elementsSearch: [].concat( elementsSearch, elementsSearchNew) })
    }

    handleSearch = async(fistflag, page, flagSearch) =>{
        let {valueLanguage} = this.props
        let {selectDestination, selectAdventure, selectActivity, 
            selectFilterDestination, selectFilterAdventure, selectFilterActivity} = this.state

        let params = {page: page, pageSize: 9}
        if(!flagSearch){
            if(selectDestination!=null)
                params['destination'] = selectDestination
            if(selectAdventure!=null)
                params['category'] = selectAdventure
            if(selectActivity!=null)
                params['adventureType'] = selectActivity
        }
        if(flagSearch){
            if(selectFilterDestination.length > 0)
                params['destination'] = selectFilterDestination.join('|')
            if(selectFilterAdventure.length > 0)
                params['category'] = selectFilterAdventure.join('|')
            if(selectFilterActivity.length > 0)
                params['adventureType'] = selectFilterActivity.join('|')
        }
        this.setState({loadState: true})
        if(fistflag)
        this.setState({elementsSearch: []})
        let searchResult = await request(endPoints.get_adventure_search, params, null, valueLanguage)
        this.setState({loadState: false})

        let contAllPage = searchResult.pages
        let contPage = contAllPage==0||contAllPage==1?null:0

        this.setState({contPage, contAllPage})

        return searchResult.objects
    }

    handleShowMore = async() => {
        let {contAllPage, contPage, flagSearch} = this.state
        let tempCount = contPage
        tempCount++;
        await this.handleElements(false, tempCount, flagSearch, true)
        if(tempCount>=(contAllPage-1))
            tempCount =null
            
        this.setState({contPage: tempCount})
    }

    handleSelectDestination = (e) => {
        let {dataDestination} = this.props
        let {selectFilterDestination} = this.state
        let stateSelect = selectFilterDestination
        let id = e.currentTarget.id.split("-")
        id = id[1]
        const index = stateSelect.indexOf( id )

        if ( index > -1 )
            stateSelect.splice( index, 1 )
        else
            stateSelect.push( id )

        let selectFilterDestinationEle = stateSelect.map((element, i) => {
            let result = dataDestination.filter(obj => {
                return obj.id === parseInt(element)
            })
            result = result[0].name
            return <span className="sty-uty-font-10-1 sty-element-search" key={`search_${i}`}>
                {result}
            </span>
        })
        this.setState({selectFilterDestination: stateSelect, selectFilterDestinationEle})
        this.handleSearchButton()
    }

    handleSelectAdventure = (e) => {
        let {selectFilterAdventure} = this.state
        let stateSelect = selectFilterAdventure
        let id = e.currentTarget.id.split("-")
        id = id[1]
        const index = stateSelect.indexOf( id )

        if ( index > -1 )
            stateSelect.splice( index, 1 )
        else
        stateSelect.push( id )

        this.setState({selectFilterAdventure: stateSelect, selectFilterAdventureEle: this.handleFilterAdventureElements(stateSelect)})
    }

    handleFilterAdventureElements = (stateSelect) => {
        let {dataAdventure} = this.state

        let selectFilterAdventureEle = stateSelect.map((element, i) => {
            let result = dataAdventure.filter(obj => {
                return obj.id === parseInt(element)
            })
            result = result[0].name
            return <span className="sty-uty-font-10-1 sty-element-search" key={`span_${i}`}>
                {result}
            </span>
        })

        this.handleSearchButton()
        return selectFilterAdventureEle
    }

    handleSelectActivity = (e) => {
        let {selectFilterActivity} = this.state
        let stateSelect = selectFilterActivity
        let id = e.currentTarget.id.split("-")
        id = id[1]
        const index = stateSelect.indexOf( id )

        if ( index > -1 )
            stateSelect.splice( index, 1 )
        else
        stateSelect.push( id )

        this.setState({selectFilterActivity: stateSelect, selectFilterActivityEle: this.handleFilterActivityElements(stateSelect)})
    }

    handleFilterActivityElements = (stateSelect) => {
        let {dataActivity} = this.state

        let selectFilterAdventureEle = stateSelect.map((element, i) => {
            let result = dataActivity.filter(obj => {
                return obj.id === parseInt(element)
            })
            result = result[0].name
            return <span className="sty-uty-font-10-1 sty-element-search" key={`span_1_${i}`}>
                {result}
            </span>
        })

        this.handleSearchButton()
        return selectFilterAdventureEle
    }

    handleSearchButton = async() => {
        await this.handleElements(true, 0, true)
        this.setState({flagSearch: true})
    }

    handleShowModal = () => {
        this.setState({modal: true})
    }

    handleCloseModal = () => {
        this.setState({modal: false})
    }

    handleWrapperButtonModal = () => {
        this.handleCloseModal()
        this.handleSearchButton()
    }

    render(){
        let {elementsSearch, contPage, 
            openDestination, elementFilterDestination,
            openAdventure, elementFilterAdventure,
            selectFilterDestinationEle, selectFilterAdventureEle,
            loadState} = this.state
        let {elementFilterActivity, openActivities, selectFilterActivityEle} = this.state
        let {modal} = this.state

        return <>
            <Modal isOpen={modal} toggle={this.handleCloseModal} centered={true} className="sty-uty-modal modal-lg">
                <ModalBody>
                    <div className="col-12 sty-padding-sides">
                        <div className="sty-uty-close sty-cursor" onClick={this.handleCloseModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="col-12 sty-content-filter sty-search">
                            <div className="col-12 sty-padding-sides sty-cont-search-data">
                                <div className="sty-uty-font-20-2">
                                    {i18n.t('search:filters')}
                                </div>
                                <div className="sty-cont-select-ele">
                                    <div className="sty-uty-font-12-1 sty-search-tag">
                                        {i18n.t('search:destinations')}
                                    </div>
                                    <div className="sty-search-values">
                                        {selectFilterDestinationEle}
                                    </div>
                                    <div className="sty-uty-font-12-1 sty-search-tag">
                                        {i18n.t('search:adventures')}
                                    </div>
                                    <div className="sty-search-values">
                                        {selectFilterAdventureEle}
                                    </div>
                                    <div className="sty-uty-font-12-1 sty-search-tag">
                                        {i18n.t('search:activities')}
                                    </div>
                                    <div className="sty-search-values">
                                        {selectFilterActivityEle}
                                    </div>
                                </div>
                                {/* <div className="">
                                    <button className="sty-button-1 sty-button-w100 sty-uty-font-16-1" onClick={this.handleWrapperButtonModal}>
                                        {i18n.t('search:search')}
                                    </button>
                                </div> */}
                            </div>
                            <div className="">
                                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleDestinatio}>
                                    {i18n.t('search:destinations')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown} width='16' height='16'/>
                                </div>
                                <Collapse isOpen={openDestination} className="sty-cont-options">
                                    <div className="content">
                                        <div className="col-12 col-all">
                                        <div className="row">
                                            {elementFilterDestination}
                                        </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="">
                                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleAdventure}>
                                    {i18n.t('search:adventures')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                                </div>
                                <Collapse isOpen={openAdventure} className="sty-cont-options">
                                    <div className="content">
                                        <div className="col-12 col-all">
                                        <div className="row">
                                            {elementFilterAdventure}
                                        </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="">
                                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleActivity}>
                                    {i18n.t('search:activities')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                                </div>
                                <Collapse isOpen={openActivities} className="sty-cont-options">
                                    <div className="content">
                                        <div className="col-12 col-all">
                                        <div className="row">
                                            {elementFilterActivity}
                                        </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <section className="container-fluid sty-search" id="id-search">
                <div className="row sty-cont-result">
                    <div className="col-12 col-md-3">
                        <div className="col-12 sty-content-filter sty-content-hidden-resp">
                            <div className="col-12 sty-padding-sides sty-cont-search-data">
                                <div className="sty-uty-font-20-2">
                                    {i18n.t('search:filters')}
                                </div>
                                <div className="sty-cont-select-ele">
                                    <div className="sty-uty-font-12-1 sty-search-tag">
                                        {i18n.t('search:destinations')}
                                    </div>
                                    <div className="sty-search-values">
                                        {selectFilterDestinationEle}
                                    </div>
                                    <div className="sty-uty-font-12-1 sty-search-tag">
                                        {i18n.t('search:adventures')}
                                    </div>
                                    <div className="sty-search-values">
                                        {selectFilterAdventureEle}
                                    </div>
                                    <div className="sty-uty-font-12-1 sty-search-tag">
                                        {i18n.t('search:activities')}
                                    </div>
                                    <div className="sty-search-values">
                                        {selectFilterActivityEle}
                                    </div>
                                </div>
                                {/* <div className="">
                                    <button className="sty-button-1 sty-button-w100 sty-uty-font-16-1" onClick={this.handleSearchButton}>
                                        {i18n.t('search:search')}
                                    </button>
                                </div> */}
                            </div>
                            <div className="">
                                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleDestinatio}>
                                    {i18n.t('search:destinations')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                                </div>
                                <Collapse isOpen={openDestination} className="sty-cont-options">
                                    <div className="content">
                                        <div className="col-12 col-all">
                                        <div className="row">
                                            {elementFilterDestination}
                                        </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="">
                                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleAdventure}>
                                    {i18n.t('search:adventures')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                                </div>
                                <Collapse isOpen={openAdventure} className="sty-cont-options">
                                    <div className="content">
                                        <div className="col-12 col-all">
                                        <div className="row">
                                            {elementFilterAdventure}
                                        </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="">
                                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleActivity}>
                                    {i18n.t('search:activities')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                                </div>
                                <Collapse isOpen={openActivities} className="sty-cont-options">
                                    <div className="content">
                                        <div className="col-12 col-all">
                                        <div className="row">
                                            {elementFilterActivity}
                                        </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 sty-padding-sides col-md-9">
                        <div className="col-12 sty-padding-sides sty-cont-sticky sty-content-show-resp" id="id-button">
                            <button className="sty-button-4 sty-button-w100" onClick={this.handleShowModal}>
                                {i18n.t('button:filter')}
                            </button>
                        </div>
                        <div className="col-12 sty-resp-cont-result">
                            <div className="col-12">
                                <div className="row">
                                    {elementsSearch}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            { contPage != null && !loadState && <button className="text-center sty-button-1 sty-button-w100 sty-button-t1 sty-uty-font-16-1" onClick={this.handleShowMore}>
                                {i18n.t('button:button_show_1')}
                            </button>
                            }
                            {loadState && <div className="sty-search-load">
                            <Image src={load} width='100%' height='100%' loading="lazy" />
                            </div>
                            }
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

const mapDispatchToProps = ( dispatch )=>{
    return {
        setLanguage: (stateLanguage)=>{
            dispatch( { type:'STATE_LANGUAGE', stateLanguage } );
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Layout );