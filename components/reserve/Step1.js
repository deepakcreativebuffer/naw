import React, {Component} from 'react';
import { connect } from 'react-redux';
import i18n from '../../helper/i18n/config';

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            requirement: []
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.valueLanguage != this.props.valueLanguage){
            this.handleInformation()
        }
        if(prevProps.detailTour!=this.props.detailTour){
            this.handleInformation()
        }
    }

    handleInformation = () => {
        let {detailTour} = this.props
        let requirementData = [{
            content: i18n.t('reserve:noCheck')
        }]
        if(typeof(detailTour.extras)!='undefined')
        if(typeof(detailTour.extras.requisito)!='undefined'){
            requirementData = detailTour.extras.requisito
        }
        
        let requirement = requirementData.map((element, i) => {
            var {content} = element
            return <p key={`p_${i}`}>
                {content}
            </p>
        })

        this.setState({requirement})
    }

    handleContinue = ()=> {
        let {handleChangeStep} = this.props
        handleChangeStep(2)
    }

    render(){
        let {requirement} = this.state
        
        return <>
            <div className="row">
                <div className="col-12">
                    <div className="sty-uty-font-30-3 sty-title-section">
                        {i18n.t('reserve:check')}
                    </div>
                    <div className="sty-uty-font-15-1">
                        {requirement}
                    </div>
                </div>
                <div className="col-12">
                    <hr />
                </div>
                <div className="col-12 sty-container-button">
                    <button className="sty-button-1-1 sty-uty-font-16-1" onClick={this.handleContinue}>
                        {i18n.t('button:button4')}
                    </button>
                </div>
            </div>
        </>
    }
    
}

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( Layout );