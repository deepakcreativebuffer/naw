import Layout   from '../components/main/Layout'
import React from 'react';
import Section1 from '../components/error/Section1'
import Section2 from '../components/error/Section2'

export default class extends React.Component{

    constructor(props){
        super(props)
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {

        try {
            let [reqDestination] = await Promise.all([
                request(endPoints1.get_destination)
            ])

            if( reqDestination.status >= 400 ) {
                var status = null
                if(reqDestination.status != 400 )
                    status = reqDestination.status

                return {
                    statusCode: status,
                    dataDestination: []
                }
            }
        
            let dataDestination = await reqDestination.objects
        
            return {
                statusCode: 200,
                dataDestination
            }
        } catch(e) {
            return {
                statusCode: 'error',
                dataDestination: []
            }
        }
    }

    render(){
        const { dataDestination } = this.props

        return <Layout
            title="Naw"
            description="Naw"
            dataDestination={dataDestination}
        >
            <Section1
                dataDestination={dataDestination}
            />
            <Section2
            />
        </Layout>
    } 
}