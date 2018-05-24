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

  addDays,
  addWeeks,
  addMonths,
  addQuarters,
  addYears,
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
    add: addDays,
  },
  week: {
    beginning: startOfWeek,
    ending: endOfWeek,
    subtract: subWeeks,
    add: addWeeks,
  },
  month: {
    beginning: startOfMonth,
    ending: endOfMonth,
    subtract: subMonths,
    add: addMonths,
  },
  quarter: {
    beginning: startOfQuarter,
    ending: endOfQuarter,
    subtract: subQuarters,
    add: addQuarters,
  },
  year: {
    beginning: startOfYear,
    ending: endOfYear,
    subtract: subYears,
    add: addYears,
  },
}

const getCalendarRange = (unit, shift = 0, date = new Date()) => {
  const {
    now,
    beginning,
    ending,
    subtract,
  } = validateParamsAndRetrieveFunctions(date, shift, unit)

  // Function logic
  const shiftedDate = subtract(date, shift)
  const start = beginning(shiftedDate)
  const end = ending(shiftedDate)

  throwIfAfter(start, now)

  return {
    start,
    end: _capDate(end, now),
  }
}

const getCustomRangeEnding = (date, count, unit) => {
  const { now, subtract } = validateParamsAndRetrieveFunctions(
    date,
    count,
    unit,
  )
  const start = subtract(date, count)
  throwIfAfter(start, now)
  return {
    start,
    end: date,
  }
}

const getCustomRangeStarting = (date, count, unit) => {
  const { now, add } = validateParamsAndRetrieveFunctions(date, count, unit)
  throwIfAfter(toTheSecond(date), now)
  const end = add(date, count)
  return {
    start: date,
    end,
  }
}

function validateParamsAndRetrieveFunctions(date, integer, unit) {
  const now = toTheSecond(new Date())
  checkIntegerOrString(integer)
  checkIsDate(date)
  return { now, ...getUnitFunctions(unit) }
}

function throwIfAfter(date1, date2) {
  if (date1.valueOf() > date2.valueOf()) {
    throw new RangeError(
      'Invalied range specified. Calculated range is in the future',
    )
  }
}

function _capDate(date, cap) {
  return date.valueOf() > cap.valueOf() ? cap : date
}

function toTheSecond(date) {
  date.setMilliseconds(0)
  return date
}

function getUnitFunctions(unit) {
  const mappedUnit = unitMap[unit]
  checkMappedUnit(mappedUnit)
  return functionsByUnit[mappedUnit]
}

function checkMappedUnit(unit) {
  if (!unit) {
    throw new TypeError(
      `The provided unit [${unit}] is invalid. Expected one of [${Object.keys(
        unitMap,
      ).join(',')}]`,
    )
  }
}

function checkIntegerOrString(value) {
  if (!Number.isInteger(value)) {
    const parsedValue = parseInt(value, 10)
    if (Number.isNaN(parsedValue)) {
      throw new TypeError(
        `Invalid value provided. Expected pareseable integer but saw ${typeof value}`,
      )
    } else {
      value = parsedValue
    }
  }
}

function checkIsDate(date) {
  if (!(date instanceof Date)) {
    throw new TypeError(
      'Invalid type provided for end. Expected (end instanceof Date) to be true',
    )
  }
}

module.exports = {
  getCalendarRange,
  getCustomRangeEnding,
  getCustomRangeStarting,
  _capDate,
}
