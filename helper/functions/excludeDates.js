import moment from 'moment';

export var excludeDayDecade = (day=0) => {
    var start = moment('2020-01-01'), 
    end   = moment('2031-01-01');                    

    var result = [];
    var current = start.clone()

    while (current.day(7 + day).isBefore(end)) {
        result.push(current.clone())
    }
    
    return result.map(m => m.toDate())
}

export var convertDate = (date) => {
    var format = moment(date).toDate()
    return format
}

export var validateCalendar = (startSeason, endSeason) => {
    let flag = false
    if(moment(endSeason).toDate()>new Date()){
        flag=true
    }
    return flag
}