import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/reservation'
import {loadElement} from '../../helper/appearance/load'
import {messageAlert} from '../../helper/appearance/messageAlert'

import Form from './form/subscribe'

class Layout extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    handleForm = async(form) => {
        let {valueLanguage} = this.props
        let params = {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email
        }

        loadElement(true)
        let data = await request(endPoints.post_subcribe, params, null, valueLanguage)
        if(data!=null)
        messageAlert('mesage_3')
        
    }

    render(){
        
        return <>
            <section className="container-fluid sty_contact sty-uty-padding-section-1">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-6">
                        <div className="sty-join-content">
                            <Form 
                                onSubmit={this.handleForm}
                            />
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
