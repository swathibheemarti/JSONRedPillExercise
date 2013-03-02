var http = require('http');
var moment = require('./moment');

http.get("http://maccherone.com/share/1000-snapshots-overlap-with-Feb-2012.json", function(res){

    var jsonString = '';
    var feb2012JobDaysCnt = 0;

    //console.log("Got response: " + res.statusCode);

    res.on('data', function(chunk){
       jsonString += chunk;
    });

    res.on('end', function(){

        //console.log(jsonString);

        var json = JSON.parse(jsonString);
        var validFrom;
        var validTo;
        var febStart = moment('2012-02-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");
        var febEnd = moment('2012-03-01T00:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSSZ");

        for(var i = 0; i < json.length; i++){

            validFrom = moment(jason[i]._ValidFrom, "YYYY-MM-DDTHH:mm:ss.SSSZ");
            validTo = moment(jason[i]._ValidTo, "YYYY-MM-DDTHH:mm:ss.SSSZ");

            if((validFrom.isBefore(febStart) || validFrom.isSame(febStart)) && validTo.isAfter(febStart)){
                if(validTo.isBefore(febEnd)){
                    feb2012JobDaysCnt += validTo.diff(febStart,'days');
                }else if(validTo.isAfter(febEnd) || validTo.isSame(febEnd)){
                    feb2012JobDaysCnt += febEnd.diff(febStart,'days');
                }
            }else if(validFrom.isAfter(febStart) && (validFrom.isBefore(febEnd) || validFrom.isSame(febEnd)) && validTo.isAfter(validFrom)){
                if(validTo.isBefore(febEnd)){
                    feb2012JobDaysCnt += validTo.diff(validFrom, 'days');
                }else{
                    feb2012JobDaysCnt += febEnd.diff(validFrom, 'days');
                }
            }
        }

    });

}).on('error', function(e){
   console.log("Got error: " + e.message);
});

function getWeekDays(startDate, endDate){
    
}

