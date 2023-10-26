import Layout from '../../components/main/Layout'
import React from 'react'
import Section1 from '../../components/reserve/SectionS1'
import Section2 from '../../components/reserve/SectionS2'

import request from '../../helper/core_services/core/core'
import endPoints1 from '../../helper/core_services/endpoints/destination'

export default class extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            scripts: null
        }
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.innerHTML = "window.dataLayer = window.dataLayer || []; window.dataLayer.push({ 'event': 'new_reservation'});";

        document.body.appendChild(script);
    }

    static async getInitialProps({ ctx, req, res, query, asPath }) {
        let uuid = query.uuid

        try {
            let [reqDestination] = await Promise.all([
                request(endPoints1.get_destination),
            ])

            if (reqDestination.status >= 400) {
                var status = null
                if (reqDestination.status != 400)
                    status = reqDestination.status
                return {
                    statusCode: status,
                    uuid,
                    dataDestination: [],
                }
            }

            let dataDestination = await reqDestination.objects

            return {
                statusCode: 200,
                uuid,
                dataDestination,
            }
        } catch (e) {
            return {
                statusCode: 'error',
                uuid,
                dataDestination: [],
            }
        }
    }

    render() {
        let { dataDestination } = this.props
        let { uuid } = this.props

        return <Layout
            title="Naw"
            description="Naw"
            dataDestination={dataDestination}
        >
            <Section1 />
            <Section2 />
        </Layout>
    }
}