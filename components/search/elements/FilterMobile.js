import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import i18n from '../../../helper/i18n/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'

var slug = require('slug')

import Check from './Check'

const load = '/static/img/favicons/app/load.gif'
const incon1 = '/static/img/favicons/tour/mark.svg'
const incon2 = '/static/img/favicons/tour/mask.svg'
const incon3 = '/static/img/favicons/tour/clock.svg'

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            openDestination: false,
            openAdventure: false,
            openActivities: false,

            elementFilterDestination: [],
            selectFilterDestination: [],
            selectFilterDestinationTag: [],

            elementFilterAdventure: [],
            selectFilterAdventure: [],
            selectFilterAdventureTag: [],

            elementFilterActivity: [],
            selectFilterActivity: [],
            selectFilterActivityTag: []
        }
    }

    componentDidMount(){
        this.handleInitDestination()
        this.handleInitAdventure()
        this.handleInitActivity()
        this.handleFilterDestination()
        this.handleFilterAdventure()
        this.handleFilterActivity()
    }

    componentDidUpdate(prevProps, prevState){
        // if(prevProps.arrayDestinations!=this.props.arrayDestinations){
        //     this.handleFilterDestination()
        // }
    }

    toogleDestinatio = () => {
        let {openDestination} = this.state
        this.setState({openDestination: !openDestination})
    }

    toogleAdventure = () => {
        let {openAdventure} = this.state
        this.setState({openAdventure: !openAdventure})
    }

    toogleActivity = () => {
        let {openActivities} = this.state
        this.setState({openActivities: !openActivities})
    }

    handleInitDestination = () => {
        let {selectDestination} = this.props
        let selectFilterDestination = []
        let stateTag = []

        selectDestination.map((element) => {
            selectFilterDestination.push(element)
            stateTag.push( <span className="sty-uty-font-10-1 sty-element-search" key={`search_${element.id}`}>
                {element.name}
            </span>)
        }) 

        this.setState({selectFilterDestination, selectFilterDestinationTag: stateTag})
    }

    handleFilterDestination = () => {
        let {dataDestination} = this.props
        let {selectDestination} = this.props
        let {arrayDestinations} = this.props
        let elementFilterDestination = []
        let temp = []
        let arraylenght = arrayDestinations.length
        let limit = parseInt(arraylenght/2)
        arrayDestinations.map((element, i) => {
            let {id, name} = element
            let flagCheck = false
            if(dataDestination!=null)if(dataDestination.id==element.id)
            flagCheck = true
            let find = selectDestination.find((obj)=>{return obj.id==id})
            if(typeof(find)!='undefined') flagCheck = true
            temp.push (<>
            <Check 
                id={id}
                name={name}
                element={element}
                active={flagCheck}
                clickEvent={this.handleSelectDestination}
            />
            </>)

            if(i == limit || i == arraylenght - 1){
                elementFilterDestination.push(<div className="col-6 sty-col" key={`dest_parent_${i}`}>
                    {temp}
                </div>)
                temp = []
            }

            return null
        })

        this.setState({elementFilterDestination})
    }

    handleSelectDestination = (element) => {
        let {handlePutDestination} = this.props
        let {selectFilterDestination, selectFilterDestinationTag} = this.state
        let stateSelect = [ ...selectFilterDestination ]
        let stateTag = [ ...selectFilterDestinationTag ]
        const index = stateSelect.findIndex(x => x.id ===element.id)
        if ( index > -1 ){
            stateSelect.splice( index, 1 )
            stateTag.splice( index, 1 )
        }
        else{
            stateSelect.push( element )
            stateTag.push( <span className="sty-uty-font-10-1 sty-element-search" key={`search_${element.id}`}>
                {element.name}
            </span> )
        }

        handlePutDestination(stateSelect)
        this.setState({selectFilterDestination: stateSelect, selectFilterDestinationTag: stateTag})
    }
    
    handleInitAdventure = () => {
        let {selectAdventure} = this.props
        let selectFilterAdventure = []
        let stateTag = []

        selectAdventure.map((element) => {
            selectFilterAdventure.push(element)
            stateTag.push( <span className="sty-uty-font-10-1 sty-element-search" key={`search_${element.id}`}>
                {element.name}
            </span>)
        }) 

        this.setState({selectFilterAdventure, selectFilterAdventureTag: stateTag})
    }

    handleFilterAdventure = () => {
        let {dataAdventure} = this.props
        let {arrayAdventures} = this.props
        let elementFilterAdventure = []
        let temp = []
        let arraylenght = arrayAdventures.length
        let limit = parseInt(arraylenght/2)

        arrayAdventures.map((element, i) => {
            let {id, name} = element
            let flagCheck = false
            if(dataAdventure!=null)if(dataAdventure.id==element.id)
            flagCheck = true
            temp.push (<>
            <Check 
                id={id}
                name={name}
                element={element}
                active={flagCheck}
                clickEvent={this.handleSelectAdventure}
            />
            </>)

            if(i == limit || i == arraylenght - 1){
                elementFilterAdventure.push(<div className="col-6 sty-col" key={`dest_parent_${i}`}>
                    {temp}
                </div>)
                temp = []
            }

            return null
        })

        this.setState({elementFilterAdventure})
    }

    handleSelectAdventure = (element) => {
        let {handlePutAdventure} = this.props
        let {selectFilterAdventure, selectFilterAdventureTag} = this.state
        let stateSelect = [ ...selectFilterAdventure ]
        let stateTag = [ ...selectFilterAdventureTag ]
        const index = stateSelect.findIndex(x => x.id ===element.id)

        if ( index > -1 ){
            stateSelect.splice( index, 1 )
            stateTag.splice( index, 1 )
        }
        else{
            stateSelect.push( element )
            stateTag.push( <span className="sty-uty-font-10-1 sty-element-search" key={`search_${element.id}`}>
                {element.name}
            </span> )
        }

        handlePutAdventure(stateSelect)
        this.setState({selectFilterAdventure: stateSelect, selectFilterAdventureTag: stateTag})
    }

    handleInitActivity = () => {
        let {selectActivity} = this.props
        let selectFilterActivity = []
        let stateTag = []

        selectActivity.map((element) => {
            selectFilterActivity.push(element)
            stateTag.push( <span className="sty-uty-font-10-1 sty-element-search" key={`search_${element.id}`}>
                {element.name}
            </span>)
        }) 

        this.setState({selectFilterActivity, selectFilterActivityTag: stateTag})
    }

    handleFilterActivity = () => {
        let {dataActivity} = this.props
        let {arrayActivities} = this.props
        let elementFilterActivity = []
        let temp = []
        let arraylenght = arrayActivities.length
        let limit = parseInt(arraylenght/2)

        arrayActivities.map((element, i) => {
            let {id, name} = element
            let flagCheck = false
            if(dataActivity!=null)if(dataActivity.id==element.id)
            flagCheck = true
            temp.push (<>
            <Check 
                id={id}
                name={name}
                element={element}
                active={flagCheck}
                clickEvent={this.handleSelectActivity}
            />
            </>)

            if(i == limit || i == arraylenght - 1){
                elementFilterActivity.push(<div className="col-6 sty-col" key={`dest_parent_${i}`}>
                    {temp}
                </div>)
                temp = []
            }

            return null
        })

        this.setState({elementFilterActivity})
    }

    handleSelectActivity = (element) => {
        let {handlePutActivity} = this.props
        let {selectFilterActivity, selectFilterActivityTag} = this.state
        let stateSelect = [ ...selectFilterActivity ]
        let stateTag = [ ...selectFilterActivityTag ]
        const index = stateSelect.findIndex(x => x.id ===element.id)

        if ( index > -1 ){
            stateSelect.splice( index, 1 )
            stateTag.splice( index, 1 )
        }
        else{
            stateSelect.push( element )
            stateTag.push( <span className="sty-uty-font-10-1 sty-element-search" key={`search_${element.id}`}>
                {element.name}
            </span> )
        }

        handlePutActivity(stateSelect)
        this.setState({selectFilterActivity: stateSelect, selectFilterActivityTag: stateTag})
    }

    render(){
        let { openDestination, openAdventure, openActivities } = this.state
        let {elementFilterDestination, selectFilterDestinationTag} = this.state
        let {elementFilterAdventure, selectFilterAdventureTag} = this.state
        let {elementFilterActivity, selectFilterActivityTag} = this.state

        return <>
            <div className="col-12 sty-padding-sides sty-cont-search-data">
                <div className="sty-uty-font-20-2">
                    {i18n.t('search:filters')}
                </div>
                <div className="sty-cont-select-ele">
                    <div className="sty-uty-font-12-1 sty-search-tag">
                        {i18n.t('search:destinations')}
                    </div>
                    <div className="sty-search-values">
                        {selectFilterDestinationTag}
                    </div>
                    <div className="sty-uty-font-12-1 sty-search-tag">
                        {i18n.t('search:adventures')}
                    </div>
                    <div className="sty-search-values">
                        {selectFilterAdventureTag}
                    </div>
                    <div className="sty-uty-font-12-1 sty-search-tag">
                        {i18n.t('search:activities')}
                    </div>
                    <div className="sty-search-values">
                        {selectFilterActivityTag}
                    </div>
                </div>
            </div>
            <div className="">
                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleDestinatio}>
                    {i18n.t('search:destinations')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                </div>
                <Collapse isOpen={openDestination} className="sty-cont-options">
                    <div className="content">
                        <div className="col-12 col-all">
                        <div className="row">
                            {elementFilterDestination}
                        </div>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div className="">
                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleAdventure}>
                    {i18n.t('search:adventures')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                </div>
                <Collapse isOpen={openAdventure} className="sty-cont-options">
                    <div className="content">
                        <div className="col-12 col-all">
                        <div className="row">
                            {elementFilterAdventure}
                        </div>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div className="">
                <div className="text-center sty-uty-font-16-1 sty-filter" onClick={this.toogleActivity}>
                    {i18n.t('search:activities')}&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                </div>
                <Collapse isOpen={openActivities} className="sty-cont-options">
                    <div className="content">
                        <div className="col-12 col-all">
                        <div className="row">
                            {elementFilterActivity}
                        </div>
                        </div>
                    </div>
                </Collapse>
            </div>
        </>
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

export default connect( mapStateToProps, mapDispatchToProps )( Layout );