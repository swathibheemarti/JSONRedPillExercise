var http = require('http');
var moment = require('./moment');

//Doing a httpGET to json URL having the input JSON
http.get("http://maccherone.com/share/1000-snapshots-overlap-with-Feb-2012.json", function(res){

    //JSON String holds the json @ the macherone site once the httpGET successfully ends
    var jsonString = '';

    var feb2012IdeaHoursCnt = 0;
    var feb2012DefinedHoursCnt = 0;
    var feb2012InProgressHoursCnt = 0;
    var feb2012CompletedHoursCnt = 0;
    var feb2012AcceptedHoursCnt = 0;

    //console.log("Got response: " + res.statusCode);

    //Call the anonymous function after each chunk of data is available from the site
    //Chunks are appended into the full jsonString
    res.on('data', function(chunk){
       jsonString += chunk;
    });

    //Call the anonymous function towards the end of the HTTPGet request, by this time, we have the
    //jsonString loaded into the string
    res.on('end', function(){

        //console.log(jsonString);

        //Parse the jsonString into native Java Object (JSON)
        var json = JSON.parse(jsonString);
        var validFrom;
        var validTo;

        //Loop through the array of objects in the JSON
        for(var i = 0; i < json.length; i++){

            //Define feb-start and feb-end
            var febStart = moment('2012-02-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");
            var febEnd = moment('2012-03-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");

            //For each job/task in the JSON get the validFrom and validTo
            validFrom = moment(json[i]._ValidFrom, "YYYY-MM-DDTHH:mm:ss.SSSZ");
            validTo = moment(json[i]._ValidTo, "YYYY-MM-DDTHH:mm:ss.SSSZ");

            //If validTo is 9999 (default for still in progress) set validTo to March,01,2012
            if(validTo.year() >= '2999'){
                validTo = moment('2012-03-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");
            }

            //Job started before febStart and ended sometime after febStart
            if(validFrom.isBefore(febStart) && validTo.isAfter(febStart)){
                //job ended before febEnd
                if(validTo.isBefore(febEnd)){

                    if(json[i].ScheduleState == "In-Progress"){
                        //If ScheduledState is in In-Progress get the hours worked on it during feb 2012
                        feb2012InProgressHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Completed"){
                        //If ScheduledState is in Completed get the hours worked on it during feb 2012
                        feb2012CompletedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Accepted"){
                        //If ScheduledState is in Accepted get the hours worked on it during feb 2012
                        feb2012AcceptedHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Idea"){
                        //If ScheduledState is in Idea get the hours worked on it during feb 2012
                        feb2012IdeaHoursCnt += getWeekDayHours(febStart, validTo, validFrom, validTo);
                    }else if(json[i].ScheduleState == "Defined"){
                        //If ScheduledState is in Defined get the hours worked on it during feb 2012
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


        //Display the results
        console.log('\n Total hours spent in each scheduled state across the pieces of work in feb 2012\n');
        console.log('Idea : ' + feb2012IdeaHoursCnt);
        console.log('Accepted : ' + feb2012AcceptedHoursCnt);
        console.log('Completed : ' + feb2012CompletedHoursCnt);
        console.log('Defined : ' + feb2012DefinedHoursCnt);
        console.log('In-Progress : ' + feb2012InProgressHoursCnt);

    });

}).on('error', function(e){
   console.log("Got error: " + e.message);
});

/*
    This function loops through the startDate and endDate and if a weekday get the hours worked on the day and returns
    cumulatively the total week day hours spent on the job between start and end date
 */
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
                weekDayHours += validTo.hours() - currentDay09AM.hours();
            }else if(validTo.isAfter(currentDay05PM)){
                weekDayHours += currentDay05PM.hours() - validFrom.hours();
            }
        }
        currentDay.add('days',1);
    }

    return weekDayHours;
}

