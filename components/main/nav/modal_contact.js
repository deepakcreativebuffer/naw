import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Modal,  ModalBody } from 'reactstrap';
import * as emailjs from 'emailjs-com';

import Form from "../form/contact"
import Image from 'next/image';

const userID = 'user_VcyyrE2DR9brx38ogBc1e'
const tamplateID = 'hap'
const serviceID = 'gmail'

const logo = "/static/img/favicons/app/logo.png"
const icon_close = "/static/img/favicons/modal/close.svg"

class Nav_modal extends Component{

    constructor(props){
        super(props)

        this.state = {
            modal: false
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.modalFlag != this.props.modalFlag){
            this.setState({modal: this.props.modalFlag})
        }
    }

    handleClose = () => {
        this.props.showModal(false)
    }

    handleForm = (form) => {
        this.handleSendMail(form)
    }

    handleSendMail = (form) => {
        console.log('email send')
        let templateParams = {
            to_name: form.name,
            to_phone: form.phone,
            to_mail: form.email,
            to_message: form.message
        }

        emailjs.send(serviceID,tamplateID,templateParams,userID)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(err) {
           console.log('FAILED...', err);
        });
    }

    render(){
        let {modal} = this.state

        return <>
        <Modal isOpen={modal} toggle={this.handleClose} centered={true} className="sty-uty-modal modal-lg">
            <ModalBody>
                <div className="col-12">
                    <div className="sty-uty-close sty-cursor" onClick={this.handleClose}>
                        <img src={icon_close}/>
                    </div>
                    <div className="text-center sty-uti-img-35 sty-uty-logo">
                        <Image src={logo} layout='fill'  loading="lazy"/>
                    </div>
                    <div className="">
                        <Form onSubmit={this.handleForm}/>
                    </div>
                </div>
            </ModalBody>
        </Modal>
        
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

export default connect( mapStateToProps, mapDispatchToProps )( Nav_modal );