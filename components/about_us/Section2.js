import React, {Component} from 'react';
import { connect } from 'react-redux';

import formatHtml from '../../helper/format/formatHtml'
import endPoints from '../../helper/core_services/endpoints/adventure'
import request from '../../helper/core_services/core/requestService'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            elementAbout: null
        }
    }

    componentDidMount(){
        this.handleAboutUs()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.handleAboutUs()
        }
    }

    handleAboutUs = async() => {
        let {valueLanguage} = this.props
        let respAbout = await request(endPoints.get_extras, null, null, valueLanguage) 
        let elementAbout = respAbout?.object.aboutUs
        elementAbout= formatHtml(elementAbout?.aboutUs)
        this.setState({elementAbout})
    }

    render(){
        let {elementAbout} = this.state
        
        return <>
            <section className="container-fluid sty_about_us sty-uty-padding-section-1">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-9 sty-content-1 sty-uty-font-16-1">
                        {elementAbout}
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