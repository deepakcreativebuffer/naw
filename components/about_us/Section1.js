import React, {Component} from 'react';

import {autoHeightMinMiddle} from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title'
const background = "/static/img/about_us/background/1.jpg"

export default class Layout extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        autoHeightMinMiddle("class-autoheight")
    }

    render(){
        
        return <>
            <HeaderTitle
                background={background}
                title={"About us"}
            />
        </>
    }
    
}
