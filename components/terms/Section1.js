import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title'
const background = "/static/img/about_us/background/1.jpg"

class Layout extends Component {

    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({lang:this.props.valueLanguage})
        }
    }

    componentDidMount(){
        autoHeightMinMiddle("class-autoheight")
    }

    render(){
        
        return <>
            <HeaderTitle
                background={background}
                title={i18n.t('title:title_privacy')}
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

