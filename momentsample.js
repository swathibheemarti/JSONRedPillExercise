var moment = require('./moment');

/*
console.log(moment().diff(moment('2009-05-16'), 'days'));
console.log(moment().isAfter(moment('2009-05-16')));
console.log(moment('2009-05-16').isBefore(moment()));
console.log(moment('2009-05-16').isSame(moment()));
console.log(moment().add('days',2).day());
console.log(moment().day());
console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").day());
console.log(moment('9999-01-01T00:00:00.000Z').isAfter(moment('2012-01-20T01:30:52.851Z')));
console.log(getWeekDays(moment('2013-01-01T00:00:00.000Z'), moment('2013-01-31T00:00:00.000Z')));
*/

console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").hours());
console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").minutes());
console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").seconds());
console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").milliseconds());
var test = moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ");
console.log(moment(test.format("YYYY-MM-DD") + "T09:30:52.851Z").format());
console.log(moment(test.format("YYYY-MM-DD") + "T17:52.851Z").format());
console.log(moment().year() == '2013');

console.log(moment('2012-02-15T00:25:10.653Z').isAfter(moment('2012-02-01T00:00:00.000Z')));




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
