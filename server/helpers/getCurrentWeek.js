const moment = require('moment');

/*
Returns the date of the Monday of the current week
*/
module.exports = function getCurrentWeek() {
  const currentWeek = moment().startOf('isoweek');

  return `${currentWeek.year()}-${currentWeek.month() + 1}-${currentWeek.date()}`
}
