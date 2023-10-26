import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title'

const background = "/static/img/search/background/1.jpg"

class Layout extends Component {

    constructor(props){
        super(props) 

        this.state={
            thisBackground: background
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
        }
        if(prevProps.thisBackground!=this.props.thisBackground){
            this.setState({thisBackground: this.props.thisBackground})
        }
    }

    componentDidMount(){
        autoHeightMinMiddle("class-autoheight")
    }

    render(){
        let {thisBackground} = this.state
        return <>
            <HeaderTitle
                background={thisBackground}
                title={i18n.t("title:title_search")}
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