var moment = require('./moment');

console.log(moment().diff(moment('2009-05-16'), 'days'));
console.log(moment().isAfter(moment('2009-05-16')));
console.log(moment('2009-05-16').isBefore(moment()));
console.log(moment().add('days',2).day());
console.log(moment("2012-01-20T01:30:52.851Z", "YYYY-MM-DDTHH:mm:ss.SSSZ").day());
console.log(moment('9999-01-01T00:00:00.000Z').isAfter(moment('2012-01-20T01:30:52.851Z')));


