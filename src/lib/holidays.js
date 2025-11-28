import Holidays from 'date-holidays'

const hd = new Holidays()

export function getCountries() {
    return hd.getCountries()
}

export function getHolidays(countryCode, year = new Date().getFullYear()) {
    hd.init(countryCode)
    return hd.getHolidays(year)
}

export function getNextHoliday(countryCode, holidayName) {
    hd.init(countryCode)
    const now = new Date()
    const year = now.getFullYear()
    const holidays = hd.getHolidays(year)

    // Find holiday in current year
    let holiday = holidays.find(h => h.name.toLowerCase().includes(holidayName.toLowerCase()))

    if (holiday) {
        const holidayDate = new Date(holiday.date)
        if (holidayDate > now) {
            return holiday
        }
    }

    // If not found or passed, check next year
    const nextYearHolidays = hd.getHolidays(year + 1)
    holiday = nextYearHolidays.find(h => h.name.toLowerCase().includes(holidayName.toLowerCase()))

    return holiday
}

export function getUpcomingHolidays(countryCode, limit = 5) {
    hd.init(countryCode)
    const now = new Date()
    const year = now.getFullYear()
    let holidays = hd.getHolidays(year).filter(h => new Date(h.date) > now)

    if (holidays.length < limit) {
        const nextYearHolidays = hd.getHolidays(year + 1)
        holidays = [...holidays, ...nextYearHolidays]
    }

    return holidays.slice(0, limit)
}
