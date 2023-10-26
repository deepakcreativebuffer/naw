import React from 'react';
import Layout from '../../components/main/Layout'

import Section1 from '../../components/reserve/Section1'
import Section2 from '../../components/reserve/Section2'

import request from '../../helper/core_services/core/core'
import endPoints1 from '../../helper/core_services/endpoints/destination'

export default class extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            scripts: null
        }
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

    componentWillMount() {

    }

    componentDidMount() {

        // setTimeout(()=>{
        //     const script = document.createElement("script");
        //     script.async = true;
        //     script.src = "https://js.stripe.com/v3/";
        //     this.setState({scripts: script})
        //     document.getElementById('__next').appendChild(script);
        // }, 2000)

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://js.stripe.com/v3/";
        this.setState({ scripts: script })
        document.getElementById('__next').appendChild(script);

        window.scrollTo({
            'behavior': 'smooth',
            'top': 0
        });
    }

    componentWillUnmount() {
        let { scripts } = this.state
        document.getElementById('__next').removeChild(scripts);
    }


    render() {
        let { dataDestination } = this.props
        let { uuid } = this.props
        let search;
        let params;
        let tourId;
        if (typeof window !== "undefined") {
            search = window.location.search;
            params = new URLSearchParams(search);
            tourId = atob(params.get('tour'));
        }

        return <Layout
            title="Naw"
            description="Naw"
            dataDestination={dataDestination}
        >
            <Section1 />
            <Section2
                uuid={uuid}
                tourid={tourId}
            />
        </Layout>
    }
}