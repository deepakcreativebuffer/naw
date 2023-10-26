import Layout   from '../../components/main/Layout'
import React from 'react'
import Section1 from '../../components/landings/Section1'
import Section2 from '../../components/landings/Section1_2'

import request from '../../helper/core_services/core/core'
import endPoints1 from '../../helper/core_services/endpoints/destination'
import endPointsLa from '../../helper/core_services/endpoints/landings'

const background = "/static/img/landings/buceo-cancun-desktop.jpg"

export default class extends React.Component{

    constructor(props){
        super(props)
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {

        try {
            let [reqDestination, reqLandingEs, reqLandingEn] = await Promise.all([
                request(endPoints1.get_destination),
                request(endPointsLa.get_landing1, null, null, 'es'),
                request(endPointsLa.get_landing1, null, null, 'en'),
            ])

            if( reqDestination.status >= 400 
                || reqLandingEs.status >= 400 
                || reqLandingEn.status >= 400 ) {
                var status = null
                if(reqDestination.status != 400 )
                    status = reqDestination.status
                if(reqLandingEs.status != 400 )
                    status = reqLandingEs.status
                if(reqLandingEn.status != 400 )
                    status = reqLandingEn.status

                return {
                    statusCode: status,
                    dataDestination: [],
                    dataLandingEs: {},
                    dataLandingEn: {},
                }
            }
        
            let dataDestination = await reqDestination.objects
            let dataLandingEs = await reqLandingEs.object
            let dataLandingEn = await reqLandingEn.object
        
            return {
                statusCode: 200,
                dataDestination,
                dataLandingEs,
                dataLandingEn,
            }
        } catch(e) {
            return {
                statusCode: 'error',
                dataDestination: [],
                dataLandingEs: {},
                dataLandingEn: {},
            }
        }
    }

    render(){
        let {dataDestination, dataLandingEs, dataLandingEn} = this.props

        return <Layout
            title={dataLandingEs.metaTitle}
            description={dataLandingEs.metaDescription}
            dataDestination={dataDestination}
        >
            <Section1
                background={background}
                dataLandingEs={dataLandingEs}
                dataLandingEn={dataLandingEn}
            />
            <Section2
            />
        </Layout>
    } 
}