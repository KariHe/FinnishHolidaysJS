Finnish Holidays JS library
===========================

Simple javascript library for calculating public Finnish holidays for a requested year.



Usage
-----

Library support CommonJS, AMD and plain javascript loading.
~~~
var FinnishHolidays = require('FinnishHolidays');

var holidaysIn2015 = FinnishHolidays(2015);
holidaysIn2015.forEach(function( holiday ) {
    console.log(holiday.name, holiday.date);
});
~~~

Or in browser
~~~
<script src="FinnishHolidays.js"></script>
<script>
    var holidaysIn2015 = FinnishHolidays(2015);
    holidaysIn2015.forEach(function( holiday ) {
        console.log(holiday.name, holiday.date);
    });
<script>
~~~
