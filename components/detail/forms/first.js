import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import moment from 'moment';
//import moment from 'moment-weekdaysin';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { rulesValidation } from '../../../helper/forms/rulesValidations'
import renderInput from '../../../helper/forms/input'
import renderSelect from '../../../helper/forms/select'
import renderSelectOne from '../../../helper/forms/select_one'
import i18n from '../../../helper/i18n/config';
import {excludeDayDecade, convertDate, compareDate} from '../../../helper/functions/excludeDates'

const icon1 = '/static/img/favicons/app/calendario.svg'
const icon2 = '/static/img/favicons/app/reloj.svg'
const icon3 = '/static/img/favicons/app/personas.svg'

const validate = values => {
    var fields = [
        {
            nameField: 'date', 
            required: true
        },
        // {
        //     nameField: 'phone', 
        //     required: true
        // },
        {
            nameField: 'hour', 
            required: true
        },
        {
            nameField: 'number', 
            required: true
        }
    ]

    var errors = rulesValidation( fields, values );

    return errors
}

const adventurous = [1,2,3,4,5,6,7,8,9,10,11,12]

class FormFirts extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            date: new Date(),
            date_select: null,
            excludeDates: null,
            minDate: null,
            maxDate: null
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.valueLanguage!=this.props.valueLanguage){
            this.setState({valueLanguage: this.props.valueLanguage})
        }
        if(prevProps.timetable!=this.props.timetable){
            this.handleCalendar()
        }
    }

    componentDidMount(){
        this.handleCalendar()
    }

    handleStartTime = (date_select) =>{
        this.setState({date_select})
        this.props.dispatch(change('FormFirts', 'date', moment(date_select).format('DD/MM/YYYY')));
    }

    handleCalendar = () => {
        let {timetable, startSeason, endSeason} = this.props
        var exclude = []

        if(typeof(timetable)!='undefined'&&timetable!=null){
            if(timetable.length>0){
                let {lu, ma, mi, ju, vi, sa, todos} = timetable[0]
                let dom = timetable[0].do
                if(!dom)
                exclude=exclude.concat(excludeDayDecade(0))
                if(!lu)
                exclude=exclude.concat(excludeDayDecade(1))
                if(!ma)
                exclude=exclude.concat(excludeDayDecade(2))
                if(!mi)
                exclude=exclude.concat(excludeDayDecade(3))
                if(!ju)
                exclude=exclude.concat(excludeDayDecade(4))
                if(!vi)
                exclude=exclude.concat(excludeDayDecade(5))
                if(!sa)
                exclude=exclude.concat(excludeDayDecade(6))
                if(todos)
                exclude = []
            }
        }

        this.setState({excludeDates: exclude})
        let minDate = new Date()
        if(minDate<convertDate(startSeason))
        minDate = convertDate(startSeason)
        this.setState({minDate, maxDate: convertDate(endSeason)})
    }

    render(){
        const { handleSubmit, time } = this.props
        let { date, date_select, excludeDates, minDate, maxDate} = this.state

        let hourSelect = time
        let hourSelectTag = moment(time, 'HH:mm').format('hh:mm A')

        let hoursOpt = time.map((element, i) => {
            return <option key={`count_${i}`} value={element}>
                {moment(element, 'HH:mm').format('hh:mm A')}
            </option>
        })
        let adventurousOpt = adventurous.map((element, i) => {
            return <option key={`count_${i}`} value={element}>
                {element}
            </option>
        })

        return (
                <form onSubmit={ handleSubmit }>
                    <div className="row">
                        <div className="col-12 sty-cont-row">
                            <div className="row">
                                <div className="col-12 col-md-6 sty-resp-content-1">
                                    <div className="sty-container-input-1">
                                        <div className="sty-icon">
                                            <img src={icon1} width='16' height='16' />
                                        </div>
                                        <DatePicker
                                            calendarClassName="calendarPicker"
                                            className="sty-uty-input-2 w-100"
                                            selected={date_select}
                                            onChange={this.handleStartTime}
                                            minDate={date}
                                            placeholderText={i18n.t('detail:date')}
                                            // locale={lanPicker}
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            excludeDates={excludeDates}
                                        />
                                        <Field
                                            name="date"
                                            component={renderInput}
                                            type="text"
                                            className="hidden_element"  
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="sty-container-input-1">
                                        <div className="sty-icon-2">
                                            <img src={icon2} width='16' height='16' />
                                        </div>
                                        <Field
                                            className="sty-uty-input-2 w-100"
                                            component={renderSelect}
                                            name="hour"
                                            default_option={i18n.t('detail:hour')}
                                            elements={hoursOpt}
                                            // valueSelect={hourSelect}
                                            // tag={hourSelectTag}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 sty-cont-row">
                            <div className="sty-container-input-1">
                                <div className="sty-icon-2">
                                    <img src={icon3} width='16' height='16' />
                                </div>
                                <Field
                                    className="sty-uty-input-2 w-100"
                                    component={renderSelect}
                                    name="number"
                                    default_option={i18n.t('detail:adventurous')}
                                    elements={adventurousOpt}
                                    // tag={"Nombre"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <button className="sty-button-1-1 sty-uty-font-16-1" type="submit">
                            {i18n.t('button:button3')}
                        </button>
                    </div>
                </form>
            );
    }
}

FormFirts = reduxForm({
  form: 'FormFirts',
  validate,
})(FormFirts);

const mapStateToProps = ( state )=>{
    return {
        valueLanguage: state.reducerNavigation.valueLanguage,
    }
}

export default connect( mapStateToProps )( FormFirts );