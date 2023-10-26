import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

var slug = require('slug')

import { autoHeightMinMiddle } from '../../helper/appearance/autoheight'
import request from '../../helper/core_services/core/requestService'
import destinations from '../../helper/core_services/endpoints/destination'
import endPoints from '../../helper/core_services/endpoints/adventure'
import { HeaderTitle } from '../../helper/appearance/header_title_description'
const backgroundD = "/static/img/search/background/1.jpg"

import Section1 from './Section1'
import Section2 from './Section2'

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            destination: null,
            activity: null,
            adventure: null,
            categoryName: null

        }
    }

    componentDidMount() {
        this.getDestination()
        this.getCategoryName()

    }
    componentWillMount = () => {
        this.getCategoryName()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.nameDestinatio != this.props.nameDestinatio) {
            this.getDestination()
        }
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.getData()
        }
    }

    getDestination = async () => {
        let { dataDestination } = this.props
        let destination = dataDestination
        this.setState({ destination })
    }

    getData = async () => {
        let { valueLanguage } = this.props
        if (this.props.dataActivity !== null) {
            let resultActivity = await request(endPoints.get_adventure_type, null, null, valueLanguage)
            const findCategory = resultActivity.objects.find((activity) => this.props.dataActivity.id === activity.id);
            this.setState({ categoryName: findCategory });
        } else if (this.props.dataAdventure != null) {
            let resultActivity = await request(endPoints.get_categories, null, null, valueLanguage)
            const findCategory = resultActivity.objects.find((activity) => this.props.dataAdventure.id === activity.id)
            this.setState({ categoryName: findCategory });
        }

    }


    getCategoryName() {

        if (this.props.dataActivity !== null) {

            this.setState({ categoryName: this.props.dataActivity })

        } else if (this.props.dataAdventure != null) {

            this.setState({ categoryName: this.props.dataAdventure })

        }

    }

    render() {
        let { arrayDestinations, arrayAdventures, arrayActivities } = this.props
        let { dataDestination, dataAdventure, dataActivity } = this.props
        let { destination } = this.state

        return <>
            <Section1
                destination={destination}
                category={this.state.categoryName}
            />
            <Section2
                arrayDestinations={arrayDestinations}
                arrayAdventures={arrayAdventures}
                arrayActivities={arrayActivities}
                dataDestination={dataDestination}
                dataAdventure={dataAdventure}
                dataActivity={dataActivity}
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
