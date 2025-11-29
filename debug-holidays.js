const { getUpcomingHolidays } = require('./src/lib/holidays');

console.log('Current Date:', new Date().toString());
const holidays = getUpcomingHolidays('US', 10);
console.log('Upcoming Holidays:', JSON.stringify(holidays, null, 2));
