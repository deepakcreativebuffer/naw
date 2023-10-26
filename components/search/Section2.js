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

var slug = require('slug')

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'
import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'

const load = '/static/img/favicons/app/load.gif'
const incon1 = '/static/img/favicons/tour/mark.svg'
const incon2 = '/static/img/favicons/tour/mask.svg'
const incon3 = '/static/img/favicons/tour/clock.svg'

import FilterDesktop from './elements/FilterDesktop'
import FilterMobile from './elements/FilterMobile'
import ResultElements from './elements/ResultElements'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            selectDestination: [],
            selectAdventure: [],
            selectActivity: [],
            flagModal: false
        }
    }

    componentWillMount(){
        this.handleInitSearch()
    }

    componentWillUnmount(){
        this.setState({
            selectDestination: [],
            selectAdventure: [],
            selectActivity: [],
            flagModal: false
        })
    }

    handleInitSearch = () => {
        let {dataDestination, dataAdventure, dataActivity} = this.props

        if(dataDestination!=null) this.handlePutDestination([dataDestination])
        if(dataAdventure!=null) this.handlePutAdventure([dataAdventure])
        if(dataActivity!=null) this.handlePutActivity([dataActivity])
    }

    handlePutDestination = (selectDestination) => {
        this.setState({selectDestination})
    }
    handlePutAdventure = (selectAdventure) => {
        this.setState({selectAdventure})
    }
    handlePutActivity = (selectActivity) => {
        this.setState({selectActivity})
    }

    handleShowModal = () => {
        this.setState({flagModal: true})
    }

    handleCloseModal = () => {
        this.setState({flagModal: false})
    }

    render(){   
        let {arrayDestinations, arrayAdventures, arrayActivities} = this.props
        let {dataDestination, dataAdventure, dataActivity} = this.props
        let {selectDestination, selectAdventure, selectActivity} = this.state
        let {flagModal} = this.state
        return <>
            <Modal isOpen={flagModal} toggle={this.handleCloseModal} centered={true} className="sty-uty-modal modal-lg">
                <ModalBody>
                    <div className="col-12 sty-padding-sides">
                        <div className="sty-uty-close sty-cursor" onClick={this.handleCloseModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="col-12 sty-content-filter sty-search">
                            <FilterMobile 
                                arrayDestinations={arrayDestinations}
                                arrayAdventures={arrayAdventures}
                                arrayActivities={arrayActivities}
                                dataDestination={dataDestination}
                                dataAdventure={dataAdventure}
                                dataActivity={dataActivity}
                                selectDestination={selectDestination}
                                selectAdventure={selectAdventure}
                                selectActivity={selectActivity}
                                handlePutDestination={this.handlePutDestination}
                                handlePutAdventure={this.handlePutAdventure}
                                handlePutActivity={this.handlePutActivity}
                            />
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <section className="container-fluid sty-search" id="id-search">
                <div className="row sty-cont-result">
                    <div className="col-12 col-md-3">
                        <div className="col-12 sty-content-filter sty-content-hidden-resp">

                            <FilterDesktop 
                                arrayDestinations={arrayDestinations}
                                arrayAdventures={arrayAdventures}
                                arrayActivities={arrayActivities}
                                dataDestination={dataDestination}
                                dataAdventure={dataAdventure}
                                dataActivity={dataActivity}
                                handlePutDestination={this.handlePutDestination}
                                handlePutAdventure={this.handlePutAdventure}
                                handlePutActivity={this.handlePutActivity}
                            />

                        </div>
                    </div>
                    <div className="col-12 sty-padding-sides col-md-9">
                        <div className="col-12 sty-padding-sides sty-cont-sticky sty-content-show-resp" id="id-button">
                            <button className="sty-button-4 sty-button-w100" onClick={this.handleShowModal}>
                                {i18n.t('button:filter')}
                            </button>
                        </div>
                        
                        <ResultElements 
                            selectDestination={selectDestination}
                            selectAdventure={selectAdventure}
                            selectActivity={selectActivity}
                        />
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