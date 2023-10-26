import React from 'react';
import Layout   from '../../components/main/Layout'
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

var slug = require('slug')

import Section from '../../components/search/Section'
import Section1 from '../../components/search/Section1'
import Section2 from '../../components/search/Section2'

import request from '../../helper/core_services/core/core'
import endPoints1 from '../../helper/core_services/endpoints/destination'
import endPoints2 from '../../helper/core_services/endpoints/adventure'

class Search extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            nameActivityTitle: null,
            picActivity: null
        }
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {
        let nameDestination = query.destination
        let nameAdventure = query.adventure
        let nameActivity = query.activity

        try {
            let [reqDestination, reqAdventureEs, reqActivityEs, reqAdventureEn, reqActivityEn] = await Promise.all([
                request(endPoints1.get_destination),
                request(endPoints2.get_categories, null, null, 'es'),
                request(endPoints2.get_adventure_type, null, null, 'es'),
                request(endPoints2.get_categories, null, null, 'en'),
                request(endPoints2.get_adventure_type, null, null, 'en'),
            ])

            if( reqDestination.status >= 400 
                && reqAdventureEs >= 400 && reqActivityEs >= 400
                && reqAdventureEn >= 400 && reqActivityEn >= 400 ) {
                var status = null
                if(reqDestination.status != 400 )
                    status = reqDestination.status
                if(reqAdventureEs.status != 400 )
                    status = reqAdventureEs.status
                if(reqActivityEs.status != 400 )
                    status = reqActivityEs.status

                return {
                    statusCode: status,
                    arrayDestinations: [],
                    arrayAdventures: [],
                    arrayActivities: [],
                    dataDestination: null,
                    dataAdventure: null,
                    dataActivity: null
                }
            }
            
            let dataDestination = null
            if(typeof(nameDestination)!='undefined'){
                let finddestination = reqDestination.objects.find((obj) => {return slug(obj.name).toLowerCase()==nameDestination})
                if(typeof(finddestination)!='undefined')
                dataDestination = finddestination
            }

            let dataAdventure = null
            let arrayAdventures = reqAdventureEs.objects
            let flagLang = 'es'
            if(typeof(nameAdventure)!='undefined'){
                let findadventureEn = reqAdventureEn.objects.find((obj) => {return slug(obj.name).toLowerCase()==nameAdventure})
                if(typeof(findadventureEn)!='undefined'){
                    arrayAdventures = reqAdventureEn.objects
                    dataAdventure = findadventureEn
                    flagLang = 'en'
                }
                let findadventure = reqAdventureEs.objects.find((obj) => {return slug(obj.name).toLowerCase()==nameAdventure})
                if(typeof(findadventure)!='undefined'){
                    arrayAdventures = reqAdventureEs.objects
                    dataAdventure = findadventure
                }                
            }

            let dataActivity = null
            let arrayActivities = reqActivityEs.objects
            if (flagLang=='en') arrayActivities = reqActivityEn.objects
            if (flagLang=='es') arrayActivities = reqActivityEs.objects
            if(typeof(nameActivity)!='undefined'){
                let findactivityEn = reqActivityEn.objects.find((obj) => {return slug(obj.name).toLowerCase()==nameActivity})
                if(typeof(findactivityEn)!='undefined'){
                    arrayActivities = reqActivityEn.objects
                    dataActivity = findactivityEn
                }
                let findactivity = reqActivityEs.objects.find((obj) => {return slug(obj.name).toLowerCase()==nameActivity})
                if(typeof(findactivity)!='undefined'){
                    arrayActivities = reqActivityEs.objects
                    dataActivity = findactivity
                }
            }
        
            return {
                statusCode: 200,
                arrayDestinations: reqDestination.objects,
                arrayAdventures: arrayAdventures,
                arrayActivities: arrayActivities,
                dataDestination,
                dataAdventure,
                dataActivity,
                nameDestination
            }
        } catch(e) {
            return {
                statusCode: 'error',
                arrayDestinations: [],
                arrayAdventures: [],
                arrayActivities: [],
                dataDestination: null,
                dataAdventure: null,
                dataActivity: null
            }
        }
    }

    componentDidMount(){
        // var scrollableDiv = document.getElementById('id-header-title')
        // setTimeout(function(){
        //     console.log(scrollableDiv.offsetHeight)
        //     window.scrollTo({
        //         'behavior': 'smooth',
        //         'top': scrollableDiv.offsetHeight-55
        //     });
        // }, 600)
    }

    componentDidUpdate(prevProps){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            
        }
    }

    handleNameActivity = (nameActivityTitle) => {
        this.setState({nameActivityTitle})
    }

    handlePicActivity = (picActivity) => {
        this.setState({picActivity})
    }

    render(){
        let {arrayDestinations, arrayAdventures, arrayActivities} = this.props
        let {dataDestination, dataAdventure, dataActivity} = this.props
        // let {nameActivityTitle, picActivity} = this.state

        console.log(arrayDestinations)
        console.log(arrayAdventures)
        console.log(arrayActivities)
        console.log(dataDestination)
        console.log(dataAdventure)
        console.log(dataActivity)

        return <Layout
            title="Naw"
            description="Naw"
            dataDestination={arrayDestinations}
        >
            <Section 
                arrayDestinations={arrayDestinations}
                arrayAdventures={arrayAdventures}
                arrayActivities={arrayActivities}
                dataDestination={dataDestination}
                dataAdventure={dataAdventure}
                dataActivity={dataActivity}
            />
            {/* <Section1
                nameDestination={nameDestination}
                dataDestination={dataDestination}
                titleL={nameActivityTitle}
                background={picActivity}
            />
            <Section2
                handleNameActivity={this.handleNameActivity}
                handlePicActivity={this.handlePicActivity}
                dataDestination={dataDestination}
                nameDestination={nameDestination}
                nameAdventure={nameAdventure}
                nameActivity={nameActivity}
            /> */}
        </Layout>
    } 
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( Search );