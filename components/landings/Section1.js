import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';


import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title_landing'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: i18n.t("title:title_search"),
            description: null
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
            this.handleTitle()
        }
        if(prevProps.nameDestination != this.props.nameDestination){
            this.handleTitle()
        }
    }

    componentDidMount(){
        autoHeightMinMiddle("class-autoheight")
        this.handleTitle()
    }

    handleTitle = () => {
        let {valueLanguage, dataLandingEs, dataLandingEn} = this.props
        let title = i18n.t("title:title_search")
        let description = ''
        
        if(valueLanguage=='es'){
            title=dataLandingEs.title
            description=dataLandingEs.description
        }
        if(valueLanguage=='en'){
            title=dataLandingEn.title
            description=dataLandingEn.description
        }

        this.setState({title, description})
    }

    render(){
        let {background} = this.props
        let {title, description} =  this.state
        
        return <>
            <HeaderTitle
                background={background}
                title={title}
                description={description}
            />
        </>
    }
    
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( Layout );
