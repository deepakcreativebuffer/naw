import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';
import { Link } from '../../routes'

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title_description'
import link from 'next/dist/client/link';

const back = '/static/img/landings/Silkies.jpg'
const img1 = '/static/img/landings/landing_1/NAW-Cozumel-1-min.png'
const img2 = '/static/img/landings/landing_1/cursos-de-buceo-playa-del-carmen-naw.jpg'
const img3 = '/static/img/landings/landing_3/tortuga-buceo-playa-del-carmen-naw.jpg'
const img4 = '/static/img/landings/landing_3/image2.png'
const img5 = '/static/img/landings/landing_3/barco-hundido-juan-escutia-naw.jpg'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            link1: {destination:'playa-del-carmen', adventure:'buceo-en-mar', tour:'barco-hundido-c-56-arrecife', uuid:68},
            link2: {destination:'playa-del-carmen', adventure:'buceo-para-principiantes', tour:'buceo-para-principiantes-en-playa-del-carmen-2-buceos', uuid:225}
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage!=this.props.valueLanguage){
            let lang = this.props.valueLanguage
            let link1 = {destination:'playa-del-carmen', adventure:'buceo-en-mar', tour:'barco-hundido-c-56-arrecife', uuid:68}
            let link2 = {destination:'playa-del-carmen', adventure:'buceo-para-principiantes', tour:'buceo-para-principiantes-en-playa-del-carmen-2-buceos', uuid:225}
            if(lang == 'en'){
                link1 = {destination:'playa-del-carmen', adventure:'ocean-dives', tour:'wreck-dive-c-56-reef', uuid:68}
                link2 = {destination:'playa-del-carmen', adventure:'beginners-diving', tour:'scuba-diving-for-beginners-in-playa-del-carmen-2-dives', uuid:225}
            }
            this.setState({link1, link2})
        }
    }

    render(){
        let {link1, link2} = this.state
        
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
                            <Link route={"detail"} params={link2}>
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
                                <Link route={"searchActivity"} params={{destination:'playa-del-carmen', adventure:'buceo', activity:'cursos-de-buceo'}}>
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
                                <Link route={"searchActivity"} params={{destination:'playa-del-carmen', adventure:'buceo', activity:'buceo-en-mar'}}>
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
                                <Link route={"searchActivity"} params={{destination:'playa-del-carmen', adventure:'buceo', activity:'buceo-en-cenote'}}>
                                <a target="_blank">
                                    <div className="sty-content-destination sty-justify-content">
                                        <div className="sty-tag sty-uty-font-30-2 text-center">
                                            {i18n.t('landing:sub_3_1')}
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
                            <div className="col-12 col-md-3 sty-padding-col">
                                <Link route={"detail"} params={link1}>
                                <a target="_blank">
                                    <div className="sty-content-destination sty-justify-content">
                                        <div className="sty-tag sty-uty-font-30-2 text-center">
                                            {i18n.t('landing:sub_1_4')}
                                        </div>
                                        <div className="sty-content-pic">
                                            <div className="sty-uty-back-section">
                                                <img src={img5}/>
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
