import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from '../../routes'
import i18n from '../../helper/i18n/config';
import Image from 'next/image';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

var slug = require('slug')

import endPoints from '../../helper/core_services/endpoints/adventure'
import request from '../../helper/core_services/core/requestService'

// const temp = '/static/img/temp/1.webp'
const icon1 = '/static/img/favicons/icons/home_1_1.svg'
const icon2 = '/static/img/favicons/icons/home_1_2.svg'
const icon3 = '/static/img/favicons/icons/home_1_3.svg'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            elementsAdventure: [],
            elementsAdventureResp: [],
            slidersResp: null
        }
    }

    componentDidMount(){
        this.handleAdventures()
        this.handleSlideResp()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
            this.handleAdventures()
            this.handleSlideResp()
        }
    }

    handleAdventures = async() => {
        let {valueLanguage} = this.props
        let categories = []
        let resultCat = await request(endPoints.get_categories, null, null, valueLanguage)
        categories = resultCat.objects

        // categories = [
        //     {
        //         "description": "Encuentro con Cocodrilos",
        //         "id": 24,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Croc_NAW.jpg",
        //         "name": "Encuentro con Cocodrilos"
        //     },
        //     {
        //         "description": "Buceo Tiburón Toro",
        //         "id": 10,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/bull-shark-dive-playa-del-carmen.jpg",
        //         "name": "Buceo Tiburón Toro"
        //     },
        //     {
        //         "description": "Liveaboards",
        //         "id": 16,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Humpbacks_-_Rodigo_Friscione_-_NAW.jpg",
        //         "name": "Liveaboards"
        //     },
        // ]

        // let testAdventure = [
        //     {
        //         "description": "Encuentro con Cocodrilos",
        //         "id": 24,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Croc_NAW.jpg",
        //         "name": "Encuentro con Cocodrilos"
        //     },
        //     {
        //         "description": "Buceo Tiburón Toro",
        //         "id": 10,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/bull-shark-dive-playa-del-carmen.jpg",
        //         "name": "Buceo Tiburón Toro"
        //     },
        //     {
        //         "description": "Liveaboards",
        //         "id": 16,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Humpbacks_-_Rodigo_Friscione_-_NAW.jpg",
        //         "name": "Liveaboards"
        //     },
        //     {
        //         "description": "Encuentro con Cocodrilos",
        //         "id": 24,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Croc_NAW.jpg",
        //         "name": "Encuentro con Cocodrilos"
        //     },
        //     {
        //         "description": "Buceo Tiburón Toro",
        //         "id": 10,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/bull-shark-dive-playa-del-carmen.jpg",
        //         "name": "Buceo Tiburón Toro"
        //     },
        //     {
        //         "description": "Liveaboards",
        //         "id": 16,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Humpbacks_-_Rodigo_Friscione_-_NAW.jpg",
        //         "name": "Liveaboards"
        //     },
        //     {
        //         "description": "Encuentro con Cocodrilos",
        //         "id": 24,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Croc_NAW.jpg",
        //         "name": "Encuentro con Cocodrilos"
        //     },
        //     {
        //         "description": "Buceo Tiburón Toro",
        //         "id": 10,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/bull-shark-dive-playa-del-carmen.jpg",
        //         "name": "Buceo Tiburón Toro"
        //     },
        //     {
        //         "description": "Liveaboards",
        //         "id": 16,
        //         "image": "https://com-crayon-naw.s3.amazonaws.com/Humpbacks_-_Rodigo_Friscione_-_NAW.jpg",
        //         "name": "Liveaboards"
        //     },
        // ]

        const anAsyncFunction = async (element, i) => {
            let {id, image, name} = element
            var nameType = name
            let elementsActivities = []
            if(i > 5) return null

            let adventures = []
            let params = {
                category: id
            }
            let resultAdv = await request(endPoints.get_adventure_type, params, null, valueLanguage)
            adventures = resultAdv.objects
            // adventures = testAdventure
            // <Link route={"search"}>
            // <a>
            // </a>
            // </Link>

            elementsActivities = adventures.map((sub, j) => {
                let {name} = sub
                var nameActivity = sub!=null?name:''
                if(j>5)
                return false
                return <Link route={'searchActivity'} params={{destination:'all', adventure:slug(nameType).toLowerCase(), activity: slug(nameActivity).toLowerCase()}} key={`activity_${j}`}>
                    <a>
                    <div className="sty-activity" key={`content_activity_${j}`}>
                        {nameActivity}
                    </div>
                    </a>
                </Link>
            })

            return <div className="col-4 sty-padding-all sty-container-adventure" key={`adventure_${i}`}>
                <div className="sty-content-adventure">
                    <div className="sty-tag sty-uty-font-20-1">
                        {name}
                    </div>
                    <div className="sty-content-pic">
                        <div className="sty-uty-back-section">
                        <Image  loader={() => image} layout='fill' loading="lazy" src={image} />
                            <div className="sty-curtain-1"></div>
                        </div>
                    </div>
                    <div className="sty-activities sty-uty-font-15-2">
                        {elementsActivities}
                        <Link route={'searchAdventure'} params={{destination: 'all', adventure: slug(name).toLowerCase()}} key={`activity_${i}`}>
                        <a>
                            <button className="sty-cont-button sty-button-1-2">
                                {i18n.t("button:button_see_1")}
                            </button>
                        </a>
                        </Link>
                    </div>
                </div>
            </div>
        }

        let elementsAdventure = Promise.all( categories.map((item, i) => anAsyncFunction(item, i)) )
        elementsAdventure.then(data => {
            this.setState({elementsAdventure: data})
        })
    }

    handleShowActivities(e) {
        var elems = document.querySelectorAll(".sty-container-adventure");
        [].forEach.call(elems, function(el) {
            el.classList.remove("sty-adventure-activities");
        });

        let element = e.currentTarget
        element.classList.toggle('sty-adventure-activities')
    }

    handleSlideResp  = async() => {
        let {valueLanguage} = this.props
        let categories = []
        let resultCat = await request(endPoints.get_categories, null, null, valueLanguage)
        categories = resultCat.objects
        let tempArray = []

        categories.map((element, i) => {
            let {name, image} = element
            let className = ''
            if(i==0)
            className = 'first'
            if((categories.length-1)==i)
            className = 'last'

            image = typeof(image)=='undefined'?temp:image
            tempArray.push(<div className={`sty-card-swi ${className}`} key={`activity_${i}`}>
                <Link route={'searchAdventure'} params={{destination: 'all', adventure: slug(name).toLowerCase()}}>
                <a>
                    <div className=" sty-resp-container-category sty-padding-sides">
                        <div className="sty-uti-background">
                        <Image layout='fill' loading="lazy" src={image}/>
                        </div>
                        <div className="sty-resp-tag">
                            {name}
                        </div>
                    </div>
                </a>
                </Link>
            </div>)
        })

        this.setState({slidersResp: tempArray})
    }

    render(){
        let {elementsAdventure, slidersResp} = this.state
        
        return <>
        <section className="container-fluid sty-home sty-uty-padding-section-1">
            <div className="row justify-content-center">
                <div className="col-12 col-md-7">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="text-center sty-uty-font-1-30-1 sty-section-2-1">
                                {i18n.t('home:tag2_1')}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center sty-section-2-2">
                        <div className="scrolling-wrapper-flexbox sty-content-show-resp">
                            {slidersResp}
                        </div>
                        <div className="col-12">
                            <div className="row sty-conteiner-pc">
                                {elementsAdventure}
                            </div>
                        </div>
                    </div>
                    <div className="row sty-section-2-3">
                        <div className="col-4 text-center">
                            <div className="sty-uty-icon-1">
                                <img src={icon1}/>
                            </div>
                            <div className="sty-uty-font-18-1 sty-tag">
                                {i18n.t('home:tag2_2')}
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className="sty-uty-icon-1">
                                <img src={icon2}/>
                            </div>
                            <div className="sty-uty-font-18-1 sty-tag">
                                {i18n.t('home:tag2_3')}
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className="sty-uty-icon-1">
                                <img src={icon3}/>
                            </div>
                            <div className="sty-uty-font-18-1 sty-tag">
                                {i18n.t('home:tag2_4')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="container-fluid sty-home">
            <div className="row justify-content-center">
                <div className="col-10">
                    <hr />
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