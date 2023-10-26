import React, {Component} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import i18n from '../../helper/i18n/config';

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

export default class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            activeTab: '1',
            dataForm2: {}
        }
    }

    toggle = (tab) => {
        this.setState({activeTab: tab})
    }

    componentDidMount(){
        // this.handleValidateCheck()
    }

    componentDidUpdate(prevProps){
        if(prevProps.detailTour!=this.props.detailTour){
            this.handleValidateCheck()
        }
    }

    handleValidateCheck = () => {
        let {handleCurrentStep} = this.props
        let {detailTour} = this.props
        if(typeof(detailTour.extras.requisito)!='undefined'){
            if(detailTour.extras.requisito.length==0){
                this.setState({activeTab: `${2}`})
                handleCurrentStep(2)
            }
        }
        if(typeof(detailTour.extras.requisito)=='undefined'){
            this.setState({activeTab: `${2}`})
            handleCurrentStep(2)
        }
    }

    handleChangeStep = (step)=> {
        let {handleCurrentStep} = this.props
        this.setState({activeTab: `${step}`})
        handleCurrentStep(step)
    }

    handleChangeForm2 = (dataForm2)=> {
        this.setState({dataForm2})
    }

    render(){
        let {uuid, detailTour} = this.props
        let {handleCupon} = this.props
        let {activeTab, dataForm2} = this.state
        
        return <div className="col-12">
            <Nav className="row">
                <NavItem className="col-4 sty-uty-font-15-3">
                    <div
                        className={classnames({ active: activeTab === '1' })}
                        // onClick={() => { this.toggle('1'); }}
                    >
                        1. {i18n.t('reserve:1requirement')}
                    </div>
                </NavItem>
                <NavItem className="col-4 sty-uty-font-15-3">
                    <div
                        className={classnames({ active: activeTab === '2' })}
                        // onClick={() => { this.toggle('2'); }}
                    >
                        2. {i18n.t('reserve:2travels')}
                    </div>
                </NavItem>
                <NavItem className="col-4 sty-uty-font-15-3">
                    <div
                        className={classnames({ active: activeTab === '3' })}
                        // onClick={() => { this.toggle('3'); }}
                    >
                        3. {i18n.t('reserve:3pay')}
                    </div>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Step1 
                        handleChangeStep={this.handleChangeStep}
                        detailTour={detailTour}
                    />
                </TabPane>
                <TabPane tabId="2">
                    <Step2
                        handleChangeStep={this.handleChangeStep}
                        handleChangeForm2={this.handleChangeForm2}
                        detailTour={detailTour}
                    />
                </TabPane>
                <TabPane tabId="3">
                    <Step3 
                        handleCupon={handleCupon}
                        activeTab={activeTab}
                        uuid={uuid}
                        dataForm2={dataForm2}
                        detailTour={detailTour}
                    />
                </TabPane>
            </TabContent>
        </div>
    }
    
}
