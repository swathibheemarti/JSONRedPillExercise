var moment = require('./moment');

console.log(moment().diff(moment('2009-05-16'), 'days'));
console.log(moment().isAfter(moment('2009-05-16')));
console.log(moment('2009-05-16').isBefore(moment()));
console.log(moment().add('days',2).day());
console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").day());
console.log(moment('9999-01-01T00:00:00.000Z').isAfter(moment('2012-01-20T01:30:52.851Z')));
console.log(getWeekDays(moment('2013-01-01T00:00:00.000Z'), moment('2013-01-31T00:00:00.000Z')));


function getWeekDays(startDate, endDate){
    var weekDays = 0;
    var currentDay = startDate;

    while(currentDay.isBefore(endDate) || currentDay.isSame(endDate)){
        if(currentDay.day() != 0 && currentDay.day() != 6){
            weekDays++;
        }
        currentDay.add('days',1);
    }

    return weekDays;
}