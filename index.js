const {
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,

  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfQuarter,
  endOfYear,

  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
} = require('date-fns')

const unitMap = {
  day: 'day',
  week: 'week',
  month: 'month',
  quarter: 'quarter',
  year: 'year',
  // Plurals
  days: 'day',
  weeks: 'week',
  months: 'month',
  quarters: 'quarter',
  years: 'year',
}

const functionsByUnit = {
  day: {
    beginning: startOfDay,
    ending: endOfDay,
    subtract: subDays,
  },
  week: {
    beginning: startOfWeek,
    ending: endOfWeek,
    subtract: subWeeks,
  },
  month: {
    beginning: startOfMonth,
    ending: endOfMonth,
    subtract: subMonths,
  },
  quarter: {
    beginning: startOfQuarter,
    ending: endOfQuarter,
    subtract: subQuarters,
  },
  year: {
    beginning: startOfYear,
    ending: endOfYear,
    subtract: subYears,
  },
}

module.exports.getCalendarRange = (unit, shift = 0, date = new Date()) => {
  const now = new Date()
  now.setMilliseconds(0)
  const mappedUnit = unitMap[unit]

  // Param checks
  if (!mappedUnit) {
    throw new TypeError(`The provided unit [${unit}] is invalid. Expected one of [${Object.keys(unitMap).join(',')}]`)
  }
  if (!Number.isInteger(shift)) {
    parsedValue = parseInt(shift, 10)
    if (Number.isNaN(parsedValue)) {
      throw new TypeError(`Invalid value provided. Expected pareseable integer but saw ${ typeof shift }`)
    } else {
      shift = parsedValue
    }
  }
  if (!(date instanceof Date)) {
    throw new TypeError('Invalid type provided for end. Expected (end instanceof Date) to be true')
  }

  // Function logic
  const { beginning, ending, subtract } = functionsByUnit[mappedUnit]
  let shiftedDate = subtract(date, shift)
  let start = beginning(shiftedDate)
  let calculatedEnd = ending(shiftedDate)

  if (start.valueOf() > now.valueOf()) {
    throw new RangeError('Invalied range specified. Calculated range is in the future')
  }
  if (calculatedEnd.valueOf() > now.valueOf()) {
    calculatedEnd = now
  }

  return {
    start,
    end: calculatedEnd
  }
}
