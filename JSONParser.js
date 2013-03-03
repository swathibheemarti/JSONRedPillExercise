var http = require('http');
var moment = require('./moment');

http.get("http://localhost/test.json", function(res){

    var jsonString = '';

    var feb2012IdeaHoursCnt = 0;
    var feb2012DefinedHoursCnt = 0;
    var feb2012InProgressHoursCnt = 0;
    var feb2012CompletedHoursCnt = 0;
    var feb2012AcceptedHoursCnt = 0;

    //console.log("Got response: " + res.statusCode);

    res.on('data', function(chunk){
       jsonString += chunk;
    });

    res.on('end', function(){

        //console.log(jsonString);

        var json = JSON.parse(jsonString);
        var validFrom;
        var validTo;

        for(var i = 0; i < json.length; i++){

            var febStart = moment('2012-02-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");
            var febEnd = moment('2012-03-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");

            validFrom = moment(json[i]._ValidFrom, "YYYY-MM-DDTHH:mm:ss.SSSZ");
            validTo = moment(json[i]._ValidTo, "YYYY-MM-DDTHH:mm:ss.SSSZ");

            if(validTo.year() >= '2999'){
                validTo = moment('2012-03-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");
            }

            if(validFrom.isBefore(febStart) && validTo.isAfter(febStart)){
                if(validTo.isBefore(febEnd)){

                    if(json[i].ScheduleState == "In-Progress"){
                        feb2012InProgressHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Completed"){
                        feb2012CompletedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Accepted"){
                        feb2012AcceptedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Idea"){
                        feb2012IdeaHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Defined"){
                        feb2012DefinedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }

                }else if(validTo.isAfter(febEnd)){

                    if(json[i].ScheduleState == "In-Progress"){
                        feb2012InProgressHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Completed"){
                        feb2012CompletedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Accepted"){
                        feb2012AcceptedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Idea"){
                        feb2012IdeaHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Defined"){
                        feb2012DefinedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }

                }
            }else if(validFrom.isAfter(febStart) && validFrom.isBefore(febEnd)){
                if(validTo.isBefore(febEnd)){

                    if(json[i].ScheduleState == "In-Progress"){
                        feb2012InProgressHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Completed"){
                        feb2012CompletedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Accepted"){
                        feb2012AcceptedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Idea"){
                        feb2012IdeaHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Defined"){
                        feb2012DefinedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }

                }else{

                    if(json[i].ScheduleState == "In-Progress"){
                        feb2012InProgressHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Completed"){
                        feb2012CompletedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Accepted"){
                        feb2012AcceptedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Idea"){
                        feb2012IdeaHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Defined"){
                        feb2012DefinedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }

                }
            }
        }


        console.log('Total hours spent in each scheduled state across the pieces of work in feb 2012\n\n');
        console.log('Idea : ' + feb2012IdeaHoursCnt);
        console.log('Accepted : ' + feb2012AcceptedHoursCnt);
        console.log('Completed : ' + feb2012CompletedHoursCnt);
        console.log('Defined : ' + feb2012DefinedHoursCnt);
        console.log('In-Progress : ' + feb2012InProgressHoursCnt);

    });

}).on('error', function(e){
   console.log("Got error: " + e.message);
});


function getWeekDayHours(startDate, endDate, validFrom, validTo){
    var weekDayHours = 0;
    var currentDay = startDate;
    var currentDay09AM;
    var currentDay05PM;

    while(currentDay.isBefore(endDate) || currentDay.isSame(endDate)){

        currentDay09AM = moment(currentDay.format("YYYY-MM-DD") + "T09:30:52.851Z");
        currentDay05PM = moment(currentDay.format("YYYY-MM-DD") + "T17:30:52.851Z");

        if(currentDay.day() != 0 && currentDay.day() != 6){

            if(validFrom.isBefore(currentDay09AM) && validTo.isAfter(currentDay05PM)){
                weekDayHours += 8;
            }else if(validFrom.isBefore(currentDay09AM)){
                weekDayHours += validTo.getHours() - currentDay09AM.getHours();
            }else if(validTo.isAfter(currentDay05PM)){
                weekDayHours += currentDay05PM.getHours() - validFrom.getHours();
            }
        }
        currentDay.add('days',1);
    }

    return weekDayHours;
}

