import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Router } from '../../routes'
import i18n from '../../helper/i18n/config';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import {autoHeightMin} from '../../helper/appearance/autoheight'

var slug = require('slug')

import endPoints from '../../helper/core_services/endpoints/adventure'
import endPoints1 from '../../helper/core_services/endpoints/destination'
import request from '../../helper/core_services/core/requestService'
import extras from '../../helper/core_services/endpoints/extras';
import Image from 'next/image';
const icon = "/static/img/favicons/app/logo.png"
const background = "/static/img/home/background/1.png"
const icon1 = "static/img/favicons/icons/map.svg"
const icon2 = "static/img/favicons/icons/oxygen.svg"
const icon3 = "static/img/favicons/icons/mask.svg"

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            picHome: undefined,
           // picHome: background,
            dataDestination: [],
            selectDestination: {
                id: null,
                tag: i18n.t('home:input1')
            },
            dataAdventure: [],
            selectAdventure: {
                id: null,
                tag: i18n.t('home:input2')
            },
            dataActivities: [],
            selectActivities: {
                id: null,
                tag: i18n.t('home:input3')
            },
        }
    }

    componentWillMount = () => {
        this.handleGetPic()
        this.handleDestinations()
        this.handleAdventure()
        this.handleActivities()
    }

    componentDidMount(){
        autoHeightMin("class-autoheight")
    }

    handleGetPic = async() => {
        let {valueLanguage} = this.props
        let req = await request(extras.get_extras, null, null, valueLanguage, false)
        // let picHome = background
        let picHome;
        if(req!=null){
            let {object} = req
            if (typeof(object.mainImage)!='undefined')
            if (object.mainImage!=null) picHome = object.mainImage.image
        }
        this.setState({picHome})
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
            this.setState({
                selectDestination: {
                    idid: null,
                    id: null,
                    tag: i18n.t('home:input1')
                }
            })
            this.setState({
                selectAdventure: {
                    idid: null,
                    id: null,
                    tag: i18n.t('home:input2')
                },
            })
            this.setState({
                selectActivities: {
                    idid: null,
                    id: null,
                    tag: i18n.t('home:input3')
                },
            })
            this.handleAdventure()
            this.handleActivities(null)
        }
        if(prevState.selectDestination.id!=this.state.selectDestination.id){
            let {selectDestination} = this.state
            let {selectAdventure} = this.state
            let {selectActivities} = this.state
            this.handleAdventure(selectDestination.idid, selectActivities.idid)
            this.handleActivities(selectDestination.idid, selectAdventure.idid)
        }
        if(prevState.selectAdventure.id!=this.state.selectAdventure.id){
            let {selectDestination} = this.state
            let {selectAdventure} = this.state
            let {selectActivities} = this.state
            this.handleDestinations(selectAdventure.idid, selectActivities.idid)
            this.handleActivities(selectDestination.idid, selectAdventure.idid)
        }
        if(prevState.selectActivities.id!=this.state.selectActivities.id){
            let {selectDestination} = this.state
            let {selectAdventure} = this.state
            let {selectActivities} = this.state
            this.handleDestinations(selectAdventure.idid, selectActivities.idid)
            this.handleAdventure(selectDestination.idid, selectActivities.idid)
        }
    }

    handleDestinations = async(category=null, adventureType=null) => {
        // let {valueLanguage} = this.props
        let {selectDestination} = this.state
        let params = {}
        if(category!=null)
        params['category'] = category
        if(adventureType!=null)
        params['adventureType'] = adventureType
        let result = await request(endPoints1.get_destination, params, null, null)
        let dataDestination = result.objects

        let elementsDestination = []
        let tempArray = []
        let cont = -1
        let limit = parseInt((dataDestination.length) / 2)
        let arrayCompare = []
        dataDestination.map((element, i) => {
          let {id, name} = element
          arrayCompare.push({id})
          tempArray.push(<DropdownItem className="sty-uty-font-12-2" id={`${id}|${name}`} onClick={this.handleSelectDestination} key={`dest_searc_${i}`}>
            {name}
          </DropdownItem>)
          cont++;
          if(cont == limit || i == (dataDestination.length-1)){
            elementsDestination.push(<div className="col-12 col-md-6" key={`search_dest_${i}`} key={`dest_cont_searc_${i}`}>
                {tempArray}
            </div>)
            tempArray = []
            cont = 0
          }
          return null
        })

        this.setState({elementsDestination})

        let destinationSelect = arrayCompare.filter(obj => {
            return obj.id === parseInt(selectDestination.idid)
        })
        if(destinationSelect.length==0){
            this.setState({selectDestination: {
                id: null,
                tag: i18n.t('home:input1')
            }})
        }
    }

    handleAdventure = async(destination=null, adventureType=null) => {
        let {valueLanguage} = this.props
        let {selectAdventure} = this.state
        let params = {}
        if(destination!=null)
        params['destination'] = destination
        if(adventureType!=null)
        params['adventureType'] = adventureType
        let result = await request(endPoints.get_categories, params, null, valueLanguage)
        let dataAdventure = result.objects
        
        let elementsAdventure = []
        let tempArrayA = []
        let contA = -1
        let limitA = parseInt((dataAdventure.length) / 2)
        let arrayCompare = []
        dataAdventure.map((element, i) => {
          let {id, name} = element
          arrayCompare.push({id})
          tempArrayA.push(<DropdownItem className="sty-uty-font-12-2" id={`${id}|${name}`} onClick={this.handleSelectAdventure} key={`adven_searc_${i}`}>
            {name}
          </DropdownItem>)
          contA++;
          if(contA == limitA || i == (dataAdventure.length-1)){
            elementsAdventure.push(<div className="col-12 col-md-6" key={`adven_cont_searc_${i}`}>
                {tempArrayA}
            </div>)
            tempArrayA = []
            contA = 0
          }
          return null
        })
    
        this.setState({elementsAdventure})

        let AdventureSelect = arrayCompare.filter(obj => {
            return obj.id === parseInt(selectAdventure.idid)
        })
        if(AdventureSelect.length==0){
            this.setState({selectAdventure: {
                id: null,
                tag: i18n.t('home:input2')
            }})
        }
    }

    handleActivities = async(destination=null, category=null) => {
        let {valueLanguage} = this.props
        let {selectActivities} = this.state
        let params = {}
        if(destination!=null)
        params['destination'] = destination
        if(category!=null)
        params['category'] = category
        let result = await request(endPoints.get_adventure_type, params, null, valueLanguage)
        let dataActivities = result.objects

        let elementsActivities = []
        let tempArrayA = []
        let contA = -1
        let limitA = parseInt((dataActivities.length) / 2)
        let arrayCompare = []
        dataActivities.map((element, i) => {
          let {id, name} = element
          arrayCompare.push({id})
          tempArrayA.push(<DropdownItem className="sty-uty-font-12-2" id={`${id}|${name}`} onClick={this.handleSelectActivity} key={`acti_content_search_${i}`}>
            {name}
          </DropdownItem>)
          contA++;
          if(contA == limitA || i == (dataActivities.length-1)){
            elementsActivities.push(<div className="col-12 col-md-6" key={`search_adven_${i}`}>
                {tempArrayA}
            </div>)
            tempArrayA = []
            contA = 0
          }
          return null
        })
    
        this.setState({elementsActivities})

        let ActivitySelect = arrayCompare.filter(obj => {
            return obj.id === selectActivities.idid
        })
        // if(ActivitySelect.length==0){
        //     this.setState({selectActivities: {
        //         id: null,
        //         tag: i18n.t('home:input3')
        //     }})
        // }
    }

    handleSelectDestination = (element) => {
        let elements = element.currentTarget.id
        elements = elements.split('|')

        this.setState({
            selectDestination: {
                idid: elements[0], 
                id: elements[1],
                tag: elements[1]
            }
        })
    }

    handleSelectAdventure = (element) => {
        let elements = element.currentTarget.id
        elements = elements.split('|')

        this.setState({
            selectAdventure: {
                idid: elements[0], 
                id: elements[1],
                tag: elements[1]
            }
        })
    }

    handleSelectActivity = (element) => {
        let elements = element.currentTarget.id
        elements = elements.split('|')

        this.setState({
            selectActivities: {
                idid: elements[0], 
                id: elements[1],
                tag: elements[1]
            }
        })
    }

    handleSearch = () => {
        let {selectDestination, selectAdventure, selectActivities} = this.state

        if(selectDestination.id != null && selectAdventure.id == null && selectActivities.id == null ){
            Router.pushRoute('searchDestination', {destination: slug(selectDestination.id).toLowerCase()})
        }
        if(selectAdventure.id != null && selectActivities.id == null ){
            let tempDestination = 'all'
            if(selectDestination.id != null){
                tempDestination = slug(selectDestination.id).toLowerCase()
            }
            Router.pushRoute('searchAdventure', {destination: tempDestination, adventure: slug(selectAdventure.id).toLowerCase()})
        }
        if(selectActivities.id != null ){
            let tempDestination = 'all'
            if(selectDestination.id != null){
                tempDestination = slug(selectDestination.id).toLowerCase()
            }
            let tempAdventure = 'all'
            if(selectAdventure.id != null){
                tempAdventure = slug(selectAdventure.id).toLowerCase()
            }
            Router.pushRoute('searchActivity', {destination: tempDestination, adventure: tempAdventure, activity: slug(selectActivities.id).toLowerCase()})
        }
        if(selectDestination.id == null && selectAdventure.id == null && selectActivities.id == null) 
        Router.pushRoute('searchAll', {})
    }

    render(){
        let {elementsDestination, selectDestination} = this.state
        let {elementsAdventure, selectAdventure} = this.state
        let {elementsActivities, selectActivities} = this.state
        let {picHome} = this.state
        return <>
        <section className="container-fluid sty-home sty-uty-section-pic-brackground class-autoheight">
            <div className="sty-uty-back-section">
         {picHome && <Image layout='fill' loading="lazy" src={picHome} />}
            </div>
            <div className="sty-curtain-1"></div>
            <div className="row justify-content-center sty-uty-min-height-parent sty-uty-padding-section-1">
                <div className="col-10 sty-justify-content">
                    <div className="row">
                        <div className="sty-logo-resp sty-margin-auto sty-content-show-resp">
                            <Link route={'index'}>
                            <Image src={icon} width='100%' height='100%'  loading="lazy"/>
                            </Link>
                        </div>
                        <div className="col-12 sty-padding-sides sty-container-title">
                            <div className="sty-uty-font-60-1 sty-title-resp">
                                {i18n.t('home:tag1_1')}
                            </div>
                            <div className="sty-uty-font-23-1 sty-section-1-2">
                                {i18n.t('home:tag1_2')}
                            </div>
                        </div>
                        <div className="col-12 col-md-10">
                            <div className="row sty-content-search">

                                <div className="col-12 col-md-3 sty-col-input">
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="sty-select-1">
                                            <div className="sty-content-select sty-uty-font-16-1 sty-justify-content-vertical">
                                                <div className="sty-icon"><img src={icon1} width='16' height='16' /></div>
                                                <div className="sty-tag">{ selectDestination.tag }</div>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu className="sty-uty-font-16-1 sty-uty-drop-menu-content-1">

                                            <div className="col-12">
                                            <div className="row">
                                                {elementsDestination}
                                            </div>
                                            </div>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="col-12 col-md-3 sty-col-input">
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="sty-select-1">
                                            <div className="sty-content-select sty-uty-font-16-1 sty-justify-content-vertical">
                                                <div className="sty-icon"><img src={icon2} width='16' height='16' /></div>
                                                <div className="sty-tag">{ selectAdventure.tag }</div>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu className="sty-uty-font-16-1 sty-uty-drop-menu-content-1">

                                            <div className="col-12">
                                            <div className="row">
                                                {elementsAdventure}
                                            </div>
                                            </div>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="col-12 col-md-3 sty-col-input">
                                    <UncontrolledDropdown>
                                        <DropdownToggle className="sty-select-1">
                                            <div className="sty-content-select sty-uty-font-16-1 sty-justify-content-vertical">
                                                <div className="sty-icon"><img src={icon3} width='16' height='16' /></div>
                                                <div className="sty-tag">{selectActivities.tag}</div>
                                                {/* <div className="sty-tag">{i18n.t('home:input3')}</div> */}
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu className="sty-uty-font-16-1 sty-uty-drop-menu-content-1">
                                            
                                            <div className="col-12">
                                            <div className="row">
                                                {elementsActivities}
                                            </div>
                                            </div>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                                <div className="col-12 col-md-3">
                                    <button className="sty-button-1 sty-button-w100 sty-uty-font-16-1" onClick={this.handleSearch}>
                                        {i18n.t('button:button1')}
                                    </button>
                                </div>
                            </div>
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
