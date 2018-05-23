const assert = require('assert')
const { startOfDay } = require('date-fns')

const { getCalendarRange } = require('.')

const units = [
  ['day', 'days'],
  ['week', 'weeks'],
  ['month', 'months'],
  ['quarter', 'quarters'],
  ['year', 'years'],
]

describe('Range Generator Test Suite', () => {
  describe('Units', () => {
    it('should return the same range when either a singular or a plural unit is passed in', () => {
      const now = new Date()

      for (const [single, plural] of units) {
        const rangeSingle = getCalendarRange(single, 0, now)
        const rangePlural = getCalendarRange(plural, 0, now)

        assert.deepEqual(rangeSingle, rangePlural)
      }
    })
  })

  describe('Logic', () => {
    describe('No Date Provided (end date/time is the moment the function is invoked)', () => {
      it('should return a valid range object { start: Date, end: Date } when no date or shift is provided', () => {
        const range = getCalendarRange('day')
        assert(range.start, 'range.start does not exist')
        assert(range.end, 'range.end does not exist')
      })

      it('should return a valid range object { start: Date, end: Date } when no date is provided', () => {
        const range = getCalendarRange('day', 0)
        assert(range.start, 'range.start does not exist')
        assert(range.end, 'range.end does not exist')
      })

      it('should give range from beginning of unit to current time (to the second) when no date provided and shift = 0', () => {
        const now = new Date()
        now.setMilliseconds(0)

        const range = getCalendarRange('day', 0)

        assert.deepEqual(range, {
          start: startOfDay(now),
          end: now,
        })
      })
    })

    describe('Date Is Provided (end date/time is adjusted to the end of the unit provided)', () => {
      it('should give the correct date range (beginning to end of unit) when shift = 0', () => {
        const date = new Date(2018, 0, 2, 7, 23, 64, 765)
        const range = getCalendarRange('day', 0, date)

        assert.deepEqual(range, {
          start: new Date(2018, 0, 2),
          end: new Date(2018, 0, 2, 23, 59, 59, 999),
        })
      })

      it('should give the correct date range (beginning to end of unit) when shift is a number in string form', () => {
        const date = new Date(2018, 0, 2, 7, 23, 64, 765)
        const range = getCalendarRange('day', '0', date)

        assert.deepEqual(range, {
          start: new Date(2018, 0, 2),
          end: new Date(2018, 0, 2, 23, 59, 59, 999),
        })
      })

      it('should give the correct date range (beginning to end of unit) when shift > 0', () => {
        const date = new Date(2018, 0, 2, 7, 23, 64, 765)
        const range = getCalendarRange('day', 1, date)

        assert.deepEqual(range, {
          start: new Date(2018, 0, 1),
          end: new Date(2018, 0, 1, 23, 59, 59, 999),
        })
      })
    })
  })

  describe('Errors', () => {
    it('should throw when invalid unit is provided', () => {
      const unit = 'yargle'
      assert.throws(
        () => getCalendarRange(unit, 0, new Date()),
        TypeError,
        /The provided unit \[yargle\] is invalid.*/,
      )
    })

    it('should throw when invalid shift provided', () => {
      const shift = 'invalid'
      assert.throws(
        () => getCalendarRange('day', shift, new Date()),
        TypeError,
        /Invalid value provided. Expected pareseable integer but saw string/,
      )
    })

    it('should throw when invalid end type is provided', () => {
      assert.throws(
        () => getCalendarRange('day', 0, 'not a date'),
        TypeError,
        /Invalid type provided for end. Expected \(end instanceof Date\) to be true/,
      )
    })

    it('should throw when date range start is in the future', () => {
      assert.throws(
        () => getCalendarRange('day', -3, new Date()),
        RangeError,
        /Invalied range specified. Calculated range is in the future/,
      )
    })
  })
})
