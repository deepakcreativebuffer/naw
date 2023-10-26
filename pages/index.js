import Layout   from '../components/main/Layout'
import React from 'react';
import Section1 from '../components/home/Section1'
import Section2 from '../components/home/Section2'
import Section3 from '../components/home/Section3'
import Section4 from '../components/home/Section4'

import request from '../helper/core_services/core/core'
import endPoints1 from '../helper/core_services/endpoints/destination'
import endPoints2 from '../helper/core_services/endpoints/adventure'

export default class extends React.Component{

    constructor(props){
        super(props)
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {

        try {
            let [reqDestination, reqExtras, reqIp] = await Promise.all([
                request(endPoints1.get_destination),
                request(endPoints2.get_extras, null, null, 'es'),
            ])
            if( reqDestination.status >= 400 
                || reqExtras.status >= 400) {
                    var status = null
                    if(reqDestination.status != 400 )
                    status = reqDestination.status
                if(reqExtras.status != 400 )
                status = reqExtras.status

                return {
                    statusCode: status,
                    dataDestination: [],
                    dataExtras:[]
                }
            }
          
            let dataDestination = await reqDestination.objects
            let dataExtras = await reqExtras.object
      
                
            return {
                statusCode: 200,
                dataDestination,
                dataExtras,
                ipData

            }
        } catch(e) {
            return {
                statusCode: 'error',
                dataDestination: [],
                dataExtras:[],
                ipData:{}
            }
        }
    }

    render(){
        const { dataDestination, dataExtras  } = this.props
// console.log("PROPS>>>",this.props)
        return <Layout
            title={dataExtras?.seoInfo?.metaTitle}
            description={dataExtras?.seoInfo?.metaDescription}
            dataDestination={dataDestination}
        >
            <Section1
                dataDestination={dataDestination}
            />
            <Section2
            />
            <Section4
                dataDestination={dataDestination}
            />
            <Section3
            />
        </Layout>
    } 
}