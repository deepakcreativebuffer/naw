import React, {Component} from 'react'
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

const logo_q = '/static/img/favicons/app/q.png'

class Nav_bottom extends Component{

    handleContact = () => {
        this.props.showModal(true)
    }

    render(){
        return <>
            <div className="sty-navbar-bottom sty-justify-content">
                <div className="col-12">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <div className="row align-items-center">
                                <div className="text-left col-6">
                                    {/* <div className="row align-items-center">
                                        <div className="col-12">
                                        <div className="sty-content-question">
                                            <div className="sty-question sty-justify-content">
                                            <FontAwesomeIcon icon={faQuestion} />
                                            </div>
                                        </div>
                                        <div className="sty-question-text">
                                            ¿CÓMO SER UNA IFQ?
                                        </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="text-right col-6 sty-justify-content-center">
                                    <div className="row">
                                        <div className="col-12 sty-content-contact sty-cursor sty-padding-all">
                                            <div className="sty-contact" onClick={this.handleContact}>
                                                <span className="sty-arrow">
                                                    <FontAwesomeIcon icon={faCaretUp} />
                                                </span>
                                                CONTÁCTANOS
                                            </div>
                                            <div className="sty-content-icon">
                                                <div className="sty-quater"></div>
                                                <div className="sty-icon sty-justify-content">
                                                    <img src={logo_q} width='16' height='16' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    } 
}

const mapStateToProps = ( state )=>{
    return {
        modalFlag: state.reducerNavigation.flagContact,
    }
}
  
const mapDispatchToProps = ( dispatch )=>{
    return {
        showModal: (stateBol)=>{
            dispatch( { type:'STATE_MODAL', stateBol } );
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Nav_bottom );