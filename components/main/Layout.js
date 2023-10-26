import React from 'react';
import { connect } from 'react-redux';
// import i18n from '../../helper/i18n/config';
import Head from 'next/head'
//import { parseCookies } from 'nookies'

import Navbar from './Nav'
import Footer from './Footer'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../../helper/i18n/config';

import global from '../../styles/global'
const gifLod = '/static/img/favicons/app/load.gif'
const icon = '/static/img/favicons/icons/favicon.ico'
const icon2 = '/static/img/favicons/icons/naw_thumbnail.jpge'

import TagManager from 'react-gtm-module'

import constants from '../../helper/enviroment/environment'

import Image from 'next/image';

const tagManagerArgs = {
    gtmId: constants.googleTag
}

const defaultTitle = ''
const defaultDescription = ''
const defaultAuthor = ''

class Layout extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            valueLanguage: null,
        }
    }

    componentWillMount() {
        
        // i18n.changeLanguage("en")
    }

    componentDidMount() {
        TagManager.initialize(tagManagerArgs)
        let { setLanguage } = this.props
        if (typeof window !== "undefined" && window.localStorage) {
            const tempLng  = localStorage?.getItem('lang') ? localStorage?.getItem('lang') :'' ;           
            this.setState({valueLanguage: tempLng })
            i18n.changeLanguage(tempLng)
            setLanguage(tempLng)
         }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.setState({ valueLanguage: this.props.valueLanguage })
            this.setState({ valueLanguage: this.props.valueLanguage })
        }
    }

    render() {

        const {
            children,
            title,
            description,
            author,
            og_title,
            og_description,
            og_imagen,

            dataDestination,
        } = this.props

        let titleValue = typeof (title) != 'undefined' ? title : defaultTitle
        let descriptionValue = typeof (description) != 'undefined' ? description : defaultDescription
        let authorValue = typeof (author) != 'undefined' ? author : defaultAuthor
        let ogTitle = typeof (og_title) != 'undefined' ? og_title : "Naw"
        let ogDescription = typeof (og_description) != 'undefined' ? og_description : "Naw: Live the adventure!"
        let ogImage = typeof (og_imagen) != 'undefined' ? og_imagen : icon2
        let { script } = this.state

        return <>

            <Head>
                <meta charSet="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta http-equiv="Cache-control" content="public" />
                {/**icon */}
                <link rel="icon" type="image/png" sizes="16x16" href={icon} />
                {/* <link rel="icon" href="/static/img/favicon.ico" />
            <link rel="apple-touch-icon" sizes="57x57" href="/static/img/favicons/app/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/static/img/favicons/app/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/static/img/favicons/app/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/static/img/favicons/app/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/static/img/favicons/app/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/static/img/favicons/app/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/static/img/favicons/app/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/static/img/favicons/app/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/img/favicons/app/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/static/img/favicons/app/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicons/app/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/static/img/favicons/app/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicons/app/favicon-16x16.png" />
            <link rel="manifest" href="/static/img/favicons/app/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/static/img/favicons/app/ms-icon-144x144.png" /> */}
                <script src="https://www.tripadvisor.com/WidgetEmbed-socialButtonReviews?color=green&amp;size=rect&amp;locationId=13354576&amp;display_version=2&amp;uniq=431&amp;lang=en_US" async=""></script>
                <meta name="theme-color" content="#ffffff" />
                <script async charSet="utf-8" src='https://v2.zopim.com/?4t1bksCdTb8JKCQEsWGkjGKjW75e8fIy' type='text/javascript'></script>
                {/* {(ogValue!=null)&&
            <>
            <meta property="og:type"               content="article" />
            <meta property="og:url"                content={ ogValue.metaUrl } />
            <meta property="og:title"              content={ ogValue.metaTitle } />
            <meta property="og:description"        content={ ogValue.metaDescription } />
            <meta property="og:image"              content={ ogValue.metaImage } />
            <meta property="keywords"              content={ ogValue.url } />
            </>
            } */}
                <meta property="og:site_name" content="Naw" />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImage} itemProp="image" />
                <meta property="og:type" content="website" />
                <meta property="og:updated_time" content="1483228800" />

                <title>{titleValue}</title>
                <meta name="description" content={descriptionValue} />
                <meta name="author" content={authorValue} />

                {/* <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" /> */}
                {/*<!-- Global site tag (gtag.js) - Google Ads: 845795640 --> */}

                {/*NAW GOOGLE TAGS*/}
                 <script async src="https://www.googletagmanager.com/gtag/js?id=AW-845795640"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || []; 
                    function gtag(){
                        dataLayer.push(arguments);
                    } 
                    gtag('js', new Date()); 
                    gtag('config', 'AW-845795640');
                    `}}>
                </script>
                {/*<!-- Event snippet for Inicio de la tramitación de la compra conversion page -->*/}
                <script dangerouslySetInnerHTML={{
                    __html: `gtag('event', 'conversion', { 'send_to': 'AW-845795640/h-ohCN7L6a8DELiip5MD' })
                    `}}>
                </script>



                {/*STAGE NAW  GOOGLE TAGS
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-EJSMTD2GR4"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){
                        dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', 'G-EJSMTD2GR4');
                    `}}>
                </script>*/}

            </Head>

            <body>
                <noscript dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/gtag/js?id=AW-845795640"
                            height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}>

                </noscript>
            </body>

            <Navbar
                dataDestination={dataDestination}

            />

            <div id="rootElementLoader" className="sty-load-element">
                <div className="sty-load-img">
                    <Image src={gifLod} width='100%' height='100%' loading="lazy" />
                </div>
            </div>
            <div className="sty-container-body" id="all-body">
                {children}
            </div>

            <Footer
            />

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable={false}
                pauseOnHover={false}
            />

            <style jsx global>
                {global}
            </style>

        </>
    }

}

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (stateLanguage) => {
            dispatch({ type: 'STATE_LANGUAGE', stateLanguage });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
