/*!
 * Finnish holidays JavaScript Library v0.1
 * https://github.com/KariHe/FinnishHolidaysJS
 *
 * Copyright 2015, Kari Heikkinen <kari.heikkinen@iki.fi>
 * Released under the MIT license
 * https://github.com/KariHe/FinnishHolidaysJS/LICENSE
 */

(function(root) {
  var dayInMs = 24*60*60*1000;

  function fixedHolidaysFor(year) {
    return [
      { date: new Date(year, 0, 1),   name: 'Uudenvuodenpäivä' },
      { date: new Date(year, 0, 6),   name: 'Loppiainen' },
      { date: new Date(year, 4, 1),   name: 'Vappu' },
      { date: new Date(year, 11, 6),  name: 'Itsenäisyyspäivä' },
      { date: new Date(year, 11, 24), name: 'Jouluaatto' },
      { date: new Date(year, 11, 25), name: 'Joulupäivä' },
      { date: new Date(year, 11, 26), name: 'Tapaninpäivä' }
    ]
  }

  function easternReleatedHolidaysFor(year) {
    var eastern = IanTaylorEasterJscr(year);
    var goodFriday = new Date(eastern.getTime() - 2 * dayInMs);
    var easternMonday = new Date(eastern.getTime() + dayInMs);
    var ascensionDay = new Date(eastern.getTime() + 39 * dayInMs );
    var pentecost = new Date(eastern.getTime() + 49 * dayInMs );

    return [
      { date: goodFriday, name: 'Pitkäperjantai' },
      { date: eastern, name: 'Pääsiäispäivä' },
      { date: easternMonday, name: '2. pääsiäispäivä' },
      { date: ascensionDay, name: 'Helatorstai' },
      { date: pentecost, name: 'Helluntainpäivä' }
    ]
  }

  function holidaysInBetweenTimeFrame(year) {
    // Midsummer eve is first friday between 19 June and 25 June
    var midSummerEve = findFirstWeekdayFrom(new Date(year, 5, 19), 5);
    var midSummerDay = new Date(midSummerEve.getTime() + dayInMs);

    var allSaintsDay = findFirstWeekdayFrom(new Date(year, 9, 31), 6);

    return [
      { date: midSummerEve, name: 'Juhannusaatto' },
      { date: midSummerDay, name: 'Juhannuspäivä' },
      { date: allSaintsDay, name: 'Pyhäinpäivä' }
    ]
  }

  /**
   * Find date which is first week day requested from date
   * @param date    Date where to start searching
   * @param weekday Weekday to look for
   * @returns {Date}
   */
  function findFirstWeekdayFrom(date, weekday) {
    var startDay = date.getDay();
    if( startDay === weekday )
      return new Date(date);

    var offset = weekday - startDay;
    if( offset < 0 ) {
      offset = 7 + offset;
    }

    return new Date( date.getTime() + offset * dayInMs );
  }

  /**
   * Ian Taylor algorithm for easter calculation.
   * http://www.merlyn.demon.co.uk/estralgs.txt
   */
  function IanTaylorEasterJscr(year) {
    var a = year % 19;
    var b = year >> 2;
    var c = ((b / 25)|0) + 1;
    var d = (c * 3) >> 2;
    var e = ((a * 19) - (((c * 8 + 5) / 25)|0) + d + 15) % 30;
    e += (29578 - a - e * 32) >> 10;
    e -= ((year % 7) + b - d + e + 2) % 7;
    d = e >> 5;
    var day = e - d * 31;
    var month = d + 3;

    return new Date(year, month -1, day);
  }

  /**
   * Get all Finnish holidays as array
   * @param year
   * @returns {Array}
   */
  function FinnishHolidays(year) {
    return fixedHolidaysFor(year)
      .concat(easternReleatedHolidaysFor(year))
      .concat(holidaysInBetweenTimeFrame(year));
  }


  if( typeof define === "function" && define.amd ) {
    define([], function() {
      return FinnishHolidays;
    })
  }
  else if( typeof module === "object" && module.exports ) {
    module.exports = FinnishHolidays
  }
  else {
    root.FinnishHolidays = FinnishHolidays;
  }

})(this);
