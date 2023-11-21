import React from 'react';
import Layout   from '../../components/main/Layout'
import { connect } from 'react-redux';

import Section1 from '../../components/detail/Section1'
import Section2 from '../../components/detail/Section2'
import Section3 from '../../components/detail/Section3'

import request from '../../helper/core_services/core/core'
import endPoints1 from '../../helper/core_services/endpoints/destination'
import endPoints2 from '../../helper/core_services/endpoints/adventure'

var slug = require('slug')

class Page extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            thisBackground: null
        }
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {
        let uuid = query.uuid
        let tour = query.tour
        let languageLocal = null

        try {
            let [reqDestinationEs,reqDestinationEn, reqAdventureEs, reqAdventureEn] = await Promise.all([
                request(endPoints1.get_destination,null,uuid,'es'),
                request(endPoints1.get_destination,null,uuid,'en'),
                request(endPoints2.get_adventure_detail, null, uuid, 'es'),
                request(endPoints2.get_adventure_detail, null, uuid, 'en'),
            ])

            if( reqDestinationEs.status >= 400 ||reqDestinationEn.status >= 400
                || reqAdventureEs.status >= 400 
                || reqAdventureEn.status >= 400 ) {
                var status = null
                if(reqDestinationEs.status != 400 )
                    status = reqDestinationEs.status
                    if(reqDestinationEn.status != 400 )
                    status = reqDestinationEn.status
                if(reqAdventureEs.status != 400 )
                    status = reqAdventureEs.status
                if(reqAdventureEn.status != 400 )
                    status = reqAdventureEn.status
                return {
                    statusCode: status,
                    uuid,
                    tour,
                    dataDestination: [],
                    dataDetail: {},
                    languageLocal
                }
            }
        
            let dataDestinationEs = await reqDestinationEs.objects
            let dataDestinationEn = await reqDestinationEn.objects
            let dataDetailEs = await reqAdventureEs.object
            let dataDetailEn = await reqAdventureEn.object
            let dataDetail = {}
            let dataDestination= []

            if(slug(dataDetailEs.title).toLowerCase()==tour){
                dataDetail = dataDetailEs
                dataDestination = dataDestinationEs 
                languageLocal='es'
            }else{
                dataDetail = dataDetailEn
                dataDestination = dataDestinationEn 
                languageLocal='en'
            }
        
            return {
                statusCode: 200,
                uuid,
                tour,
                dataDestination,
                dataDetail,
                languageLocal
            }
        } catch(e) {
            return {
                statusCode: 'error',
                uuid,
                tour,
                dataDestination: [],
                dataDetail: {},
                languageLocal
            }
        }
    }
        
    handleBackGround = (thisBackground) => {
        this.setState({thisBackground})
    }

    render(){
        let {dataDestination, dataDetail} = this.props
        let {uuid, tour} = this.props
        let {thisBackground} = this.state
        let {languageLocal} = this.props
        

        let pic = typeof(dataDetail.images)!='undefined'?dataDetail.images:null
        if(pic!=null){
            if(pic.length>0)
            pic=pic[0].image
        }

        return <Layout
            title="Naw"
            description="Naw"
            og_title={`Naw: ${dataDetail.title}`}
            og_description={dataDetail.description}
            og_imagen={pic}
            dataDestination={dataDestination}
        >
            <div className="sty-content-hidden-resp">
                <Section1
                    thisBackground={thisBackground}
                />
            </div>
            <Section2 
                handleBackGround={this.handleBackGround}
                tour={tour}
                uuid={uuid}
                languageLocal={languageLocal}
            />
            <Section3
                uuid={uuid}
            />
        </Layout>
    } 
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

const mapDispatchToProps = ( dispatch )=>{
    return {
        setLanguage: (stateLanguage)=>{
            dispatch( { type:'STATE_LANGUAGE', stateLanguage } );
        }
    }
  }

export default connect( mapStateToProps, mapDispatchToProps)( Page );