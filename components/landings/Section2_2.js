import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';
import { Link } from '../../routes'

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title_description'

const back = '/static/img/landings/Silkies.jpg'
const img1 = '/static/img/landings/landing_1/NAW-Cozumel-1-min.png'
const img2 = '/static/img/landings/landing_1/cursos-de-buceo-playa-del-carmen-naw.jpg'
const img3 = '/static/img/landings/landing_2/NAW-nurse-Shark-Cozumel.jpg'
const img4 = '/static/img/landings/landing_2/night-diving-NAW-min.jpg'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            link1: {destination:'cozumel', adventure:'cursos-de-buceo', tour:'curso-padi-open-water', uuid:197},
            link2: {destination:'cozumel', adventure:'buceo-en-mar', tour:'buceo-en-cozumel-2-buceos', uuid:196},
            link3: {destination:'cozumel', adventure:'primer-buceo', tour:'descubriendo-el-buceo-en-cozumel-2-buceos', uuid:195},
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage!=this.props.valueLanguage){
            let lang = this.props.valueLanguage
            let link1 = {destination:'cozumel', adventure:'cursos-de-buceo', tour:'curso-padi-open-water', uuid:197}
            let link2 = {destination:'cozumel', adventure:'buceo-en-mar', tour:'buceo-en-cozumel-2-buceos', uuid:196}
            let link3 = {destination:'Cozumel', adventure:'primer-buceo', tour:'descubriendo-el-buceo-en-cozumel-2-buceos', uuid:195}
            if(lang == 'en'){
                link1 = {destination:'cozumel', adventure:'scuba-courses', tour:'padi-open-water-course', uuid:197}
                link2 = {destination:'cozumel', adventure:'ocean-dives', tour:'cozumel-dive-2-dives', uuid:196}
                link3 = {destination:'cozumel', adventure:'first-dive', tour:'discover-scuba-diving-in-cozumel-2-dives', uuid:195}
            }
            this.setState({link1, link2, link3})
        }
    }

    render(){
        let {link1, link2, link3} = this.state
        
        return <section className="container-fluid sty-landing">
            <div className="sty-uty-back-section">
                <img src={back}/>
            </div>
            <div className="container-fluid sty-content-margin">
                <div className="row justify-content-center">
                    <div className="text-center col-11">
                        <div className="sty-uty-font-1-30-1 sty-title-section">
                            {i18n.t('landing:title_2_1')}
                        </div>
                    </div>
                    <div className="col-11">
                        <div className="row justify-content-center sty-home">
                            <div className="col-12 col-md-3 sty-padding-col">
                                <Link route={"detail"} params={link3}>
                                <a target="_blank">
                                    <div className="sty-content-destination sty-justify-content">
                                        <div className="sty-tag sty-uty-font-30-2 text-center">
                                            {i18n.t('landing:sub_1_1')}
                                        </div>
                                        <div className="sty-content-pic">
                                            <div className="sty-uty-back-section">
                                                <img src={img1}/>
                                            </div>
                                        </div>
                                        <div className="fade"></div>
                                    </div>
                                </a>
                                </Link>
                            </div>
                            <div className="col-12 col-md-3 sty-padding-col">
                                <Link route={"detail"} params={link1}>
                                <a target="_blank">
                                    <div className="sty-content-destination sty-justify-content">
                                        <div className="sty-tag sty-uty-font-30-2 text-center">
                                            {i18n.t('landing:sub_1_2')}
                                        </div>
                                        <div className="sty-content-pic">
                                            <div className="sty-uty-back-section">
                                                <img src={img2}/>
                                            </div>
                                        </div>
                                        <div className="fade"></div>
                                    </div>
                                </a>
                                </Link>
                            </div>
                            <div className="col-12 col-md-3 sty-padding-col">
                                <Link route={"detail"} params={link2}>
                                <a target="_blank">
                                    <div className="sty-content-destination sty-justify-content">
                                        <div className="sty-tag sty-uty-font-30-2 text-center">
                                            {i18n.t('landing:sub_2_1')}
                                        </div>
                                        <div className="sty-content-pic">
                                            <div className="sty-uty-back-section">
                                                <img src={img3}/>
                                            </div>
                                        </div>
                                        <div className="fade"></div>
                                    </div>
                                </a>
                                </Link>
                            </div>
                            <div className="col-12 col-md-3 sty-padding-col">
                                <Link route={"searchActivity"} params={{destination:'cozumel', adventure:'buceo', activity:'cursos-de-buceo'}}>
                                <a target="_blank">
                                    <div className="sty-content-destination sty-justify-content">
                                        <div className="sty-tag sty-uty-font-30-2 text-center">
                                            {i18n.t('landing:sub_2_2')}
                                        </div>
                                        <div className="sty-content-pic">
                                            <div className="sty-uty-back-section">
                                                <img src={img4}/>
                                            </div>
                                        </div>
                                        <div className="fade"></div>
                                    </div>
                                </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
    
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( Layout );
