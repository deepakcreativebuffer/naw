import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

var slug = require('slug')

import { autoHeightMinMiddle } from '../../helper/appearance/autoheight'

import { HeaderTitle } from '../../helper/appearance/header_title_description'
const backgroundD = "/static/img/search/background/1.jpg"

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: i18n.t("title:title_search"),
            description: null,
            background: backgroundD
        }
    }
    componentWillMount = () => {
        this.handleTitle()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.destination != this.props.destination) {
            this.handleTitle()
        }

        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.setState({ valueLanguage: this.props.valueLanguage })
            this.handleTitle()
        }
        if(prevProps.category != this.props.category){
            this.handleTitle()
        }
        if (prevProps.nameDestination != this.props.nameDestination) {
            this.handleTitle()
        }
        if (prevProps.titleL != this.props.titleL) {
            this.handleTitle()
        }
        if (prevProps.background != this.props.background) {
            this.handleTitle()
        }
    }

    componentDidMount() {
        autoHeightMinMiddle("class-autoheight")
        this.handleTitle()
    }

    handleTitle = () => {
        let { destination } = this.props
        let title = i18n.t("title:title_search")
        let background = backgroundD
        let description = null
        if (this.props.category != null) {
            title = this.props.category.name
            background = this.props.category.image
        }
        if (destination != null) {
            title = destination.name
            background = destination.image
            description = destination.description
        }
        this.setState({ title, background, description })
    }

    render() {
        let { title, description, background } = this.state

        return <>
            <HeaderTitle
                background={background}
                title={title}
                description={description}
            />
        </>
    }

}

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect(mapStateToProps)(Layout);
