import React, {Component} from 'react';
import { connect } from 'react-redux';

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title'
import i18n from '../../helper/i18n/config';
const background = "/static/img/about_us/background/1.jpg"

class Layout extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        autoHeightMinMiddle("class-autoheight")
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
        }
    }

    render(){
        
        return <>
            <HeaderTitle
                background={background}
                title={i18n.t('title:title_reservation')}
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
