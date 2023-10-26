import React, {Component} from 'react';
import { Modal,  ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from '../../../routes';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ReactStars from 'react-stars'
import i18n from '../../../helper/i18n/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import {isMobile} from 'react-device-detect';
import Image from 'next/image';
var slug = require('slug')

import request from '../../../helper/core_services/core/requestService'
import endPoints from '../../../helper/core_services/endpoints/adventure'
import MoneyValue from '../../main/MoneyValue';

const load = '/static/img/favicons/app/load.gif'
const incon1 = '/static/img/favicons/tour/mark.svg'
const incon2 = '/static/img/favicons/tour/mask.svg'
const incon3 = '/static/img/favicons/tour/clock.svg'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            elementsSearch: [],
            elementsDataSearch: [],
            loadState: false,
            flagShowMore: false,
            countPage: 0
        }
    }

    componentDidMount(){
        this.handleGetData();
    
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage!=this.props.valueLanguage){
            this.handleDrawElements();
            this.handleGetData();
        }
        if(prevProps.selectDestination!=this.props.selectDestination
            || prevProps.selectAdventure!=this.props.selectAdventure
            || prevProps.selectActivity!=this.props.selectActivity
        ){
            if(this.state.countPage==0)
            this.handleGetData()
            else
            this.setState({countPage: 0})
        }

        if(prevState.countPage!=this.state.countPage){
            this.handleGetData()
        }
        if(prevState.elementsDataSearch!=this.state.elementsDataSearch){
            this.handleDrawElements()
        }
        
    }   

    handleDrawElements = async() => {
        let {elementsDataSearch} = this.state

        let elementsSearchNew = elementsDataSearch.map((element,i) => {
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
                                            <img src={incon3} width='16' height='16'/>
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

        if(elementsDataSearch.length==0){
            elementsSearchNew = <div className="col-12 text-center sty-uty-font-16-2">
                {i18n.t('search:coincidence')}
            </div>
        }

        this.setState({elementsSearch: elementsSearchNew})
    }

    handleGetData = async() => {
        let {valueLanguage} = this.props
        let {selectDestination, selectAdventure, selectActivity} = this.props
        let {elementsDataSearch, countPage} = this.state
        let result = []
        let flagShowMore = false

        let params = {page: countPage, pageSize: 9}
        params['destination'] = selectDestination.map((element)=>element.id).join('|')
        params['category'] = selectAdventure.map((element)=>element.id).join('|')
        params['adventureType'] = selectActivity.map((element)=>element.id).join('|')
        this.setState({loadState: true})
        let searchResult = await request(endPoints.get_adventure_search, params, null, valueLanguage)
        if(searchResult!=null){
            if(countPage==0) result = searchResult.objects
            else result = [ ...elementsDataSearch, ...searchResult.objects]
            if(searchResult.pages>1) 
            if(searchResult.pages-1>countPage)
            flagShowMore = true
        }
        this.setState({loadState: false,})
        this.setState({flagShowMore})
        console.log(result)
        this.setState({elementsDataSearch: result})
        
    }
 

    handleShowMore= () => {
        let {countPage} = this.state
        this.setState({countPage: countPage+1})
    }

    render(){
        let {elementsSearch} = this.state
        let {flagShowMore, loadState} = this.state
        return <>
            <div className="col-12 sty-resp-cont-result">
                <div className="col-12">
                    <div className="row">
                        {elementsSearch}
                    </div>
                </div>
            </div>
            <div className="col-12">
                { flagShowMore && !loadState && <button className="text-center sty-button-1 sty-button-w100 sty-button-t1 sty-uty-font-16-1" onClick={this.handleShowMore}>
                    {i18n.t('button:button_show_1')}
                </button>
                }
                {loadState && <div className="sty-search-load">
                <Image src={load} width='100%' height='100%' loading="lazy" />
                </div>
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

const mapDispatchToProps = ( dispatch )=>{
    return {
        setLanguage: (stateLanguage)=>{
            dispatch( { type:'STATE_LANGUAGE', stateLanguage } );
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Layout );