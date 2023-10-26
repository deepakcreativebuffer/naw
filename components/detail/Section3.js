import React, { Component } from 'react';
import { Link } from '../../routes';
import i18n from '../../helper/i18n/config';
import ReactStars from 'react-stars'
import Image from 'next/image';
import request from '../../helper/core_services/core/requestService'
import endPoints from '../../helper/core_services/endpoints/adventure'

var slug = require('slug')

// const temp = '/static/img/temp/3.webp'
const incon1 = '/static/img/favicons/tour/mark.svg'
const incon2 = '/static/img/favicons/tour/mask.svg'
const incon3 = '/static/img/favicons/tour/clock.svg'

class Layout extends Component {

    constructor(props) {
        super(props)

        this.state = {
            elementsPopular: [],
            elementsPopularMore: [],
            flagShowMore: true,
        }
    }

    componentWillMount() {
        this.handleInformation()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.valueLanguage != this.props.valueLanguage) {
            this.handleInformation()
        }
        if (prevProps.uuid != this.props.uuid) {
            this.handleInformation()
        }
    }

    handleInformation = async () => {
        let { valueLanguage, uuid } = this.props

        let dataDetail = await request(endPoints.get_adventure_similar, null, uuid, valueLanguage)
        let dataPopular = []
        if (dataDetail != null)
            dataPopular = dataDetail.objects
        let elementsPopular = []
        let elementsPopularMore = []

        let similarElements = dataPopular.map((element, i) => {
            let { id, image, title, averagePrice, destination, adventureType, duration,
                score, discount } = element
            var price = null
            var afterPrice = null
            if (parseInt(discount) > 0) {
                price = (parseFloat(averagePrice) - parseFloat(discount)).toFixed(2)
                afterPrice = parseFloat(averagePrice).toFixed(2)
            } else {
                price = parseFloat(averagePrice).toFixed(2)
            }

            let nameDestination = typeof (destination.name) == 'undefined' ? null : destination.name
            let nameAdventure = typeof (adventureType.name) == 'undefined' ? null : adventureType.name

            let elementTour = <div className="col-12 col-md-4 sty-content-card-1 margin-1" key={`destination_${i}`}>
                <Link route={"detail"} params={{ destination: slug(nameDestination).toLowerCase(), adventure: slug(nameAdventure).toLowerCase(), tour: slug(title).toLowerCase(), uuid: id }}>
                    <a>
                        <div className="sty-content-all col-12">
                            <div className="row">
                                <div className="col-5 col-md-12 sty-content-picture">
                                    <div className="sty-uty-back-section">
                                        <Image layout='fill' loading="lazy" src={image} />
                                    </div>
                                    <div className="text-right sty-uty-font-15-1 sty-price sty-content-hidden-resp">
                                        {afterPrice != null && <div className="sty-discount sty-uty-font-10-1">
                                            <MoneyValue price={afterPrice}></MoneyValue>
                                        </div>}
                                        <MoneyValue price={price}></MoneyValue><br />
                                        {i18n.t('search:perPerson')}
                                    </div>
                                </div>
                                <div className="col-7 col-md-12 sty-cont-data">
                                    <div className="sty-title sty-uty-font-1-14-2">
                                        {title}
                                    </div>
                                    <div className="sty-hr"></div>
                                    <div className="sty-content-features">
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                                <img src={incon1} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {nameDestination}
                                            </div>
                                        </div>
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                                <img src={incon2} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {nameAdventure}
                                            </div>
                                        </div>
                                        <div className="sty-feature">
                                            <div className="sty-icon">
                                                <img src={incon3} width='16' height='16' />
                                            </div>
                                            <div className="sty-uty-font-12-1 sty-tag">
                                                {`${duration} ${i18n.t('search:hours')}`}
                                            </div>
                                        </div>
                                        <div className="sty-cont-starts">
                                            <ReactStars
                                                className="sty-stars-1"
                                                edit={false}
                                                count={5}
                                                value={parseFloat(score)}
                                                size={12}
                                                color2={'#00E6E6'}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right sty-uty-font-12-1 sty-price sty-content-show-resp">
                                        {afterPrice != null && <div className="sty-discount sty-uty-font-10-1">
                                            <MoneyValue price={afterPrice}></MoneyValue>
                                        </div>}
                                        <MoneyValue price={price}></MoneyValue><br />
                                        {i18n.t('search:perPerson')}
                                    </div>
                                </div>
                                <div className="sty-content-buttton sty-content-hidden-resp">
                                    <button className="sty-button-2">
                                        {i18n.t("button:button2")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>

            if (i > 2) elementsPopularMore.push(elementTour)
            else elementsPopular.push(elementTour)
        })

        this.setState({ elementsPopular, elementsPopularMore })
    }

    handleShow = () => {
        let { elementsPopular, elementsPopularMore } = this.state
        let elementsPopularMoreTemp = elementsPopularMore
        let elementsPopularTemp = elementsPopular
        let addEle = elementsPopularMoreTemp.splice(0, 3)
        elementsPopularTemp = elementsPopularTemp.concat(addEle)
        this.setState({ elementsPopular: elementsPopularTemp })
        if (elementsPopularMoreTemp.length == 0)
            this.setState({ flagShowMore: false })
    }

    render() {
        let { elementsPopular, flagShowMore } = this.state

        return <>
            {(elementsPopular.length > 0) && <section className="container-fluid sty-home sty-detail sty-content-1 sty-uty-padding-section-1">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="text-center sty-uty-font-1-30-1 sty-section-2-1">
                                    Experiencias Parecidas
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center sty-section-2-2">
                            <div className="col-12">
                                <div className="row">

                                    {elementsPopular}
                                    {(flagShowMore && elementsPopular.length > 2) && <div className="col-12 sty-margin-button-1" onClick={this.handleShow}>
                                        <button className="sty-button-1 sty-button-w100 sty-uty-font-20-2">
                                            {i18n.t('button:button_show_2')}
                                        </button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
        </>
    }

}

const mapStateToProps = (state) => {
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect(mapStateToProps)(Layout);

import { connect } from 'react-redux';
import MoneyValue from '../main/MoneyValue';
