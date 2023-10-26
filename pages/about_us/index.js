import Layout   from '../../components/main/Layout'
import React from 'react'
import Section1 from '../../components/about_us/Section1'
import Section2 from '../../components/about_us/Section2'

import request from '../../helper/core_services/core/core'
import endPoints1 from '../../helper/core_services/endpoints/destination'

export default class extends React.Component{

    constructor(props){
        super(props)
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {

        try {
            let [reqDestination, reqAdventure, reqPopular] = await Promise.all([
                request(endPoints1.get_destination),
            ])

            if( reqDestination.status >= 400 ) {
                var status = null
                if(reqDestination.status != 400 )
                    status = reqDestination.status

                return {
                    statusCode: status,
                    dataDestination: [],
                }
            }
        
            let dataDestination = await reqDestination.objects
        
            return {
                statusCode: 200,
                dataDestination,
            }
        } catch(e) {
            return {
                statusCode: 'error',
                dataDestination: [],
            }
        }
    }

    render(){
        let {dataDestination} = this.props

        return <Layout
            title="Naw"
            description="Naw"
            dataDestination={dataDestination}
        >
            <Section1/>
            <Section2/>
        </Layout>
    } 
}