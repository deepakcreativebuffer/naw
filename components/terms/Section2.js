import React, {Component} from 'react';
import { connect } from 'react-redux';

import formatHtml from '../../helper/format/formatHtml'
import endPoints from '../../helper/core_services/endpoints/adventure'
import request from '../../helper/core_services/core/requestService'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            elementTerm: null
        }
    }

    componentWillMount(){
        this.handleTermsElement()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.handleTermsElement()
        }
    }

    handleTermsElement = async() => {
        let {valueLanguage} = this.props
        let respTerms = await request(endPoints.get_extras, null, null, valueLanguage) 
        let elementTerm = respTerms.object.privacyAgreement
        elementTerm= formatHtml(elementTerm?.agreement)
        this.setState({elementTerm})
    }

    render(){
        let {elementTerm} = this.state
        
        return <>
            <section className="container-fluid sty_about_us sty-uty-padding-section-1">
                <div className="row justify-content-center">
                    <div className="co-11 col-md-9 sty-content-1 sty-uty-font-16-1">
                        {elementTerm}
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
