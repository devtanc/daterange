# daterange

A library for generating date ranges as a simple wrapper around [date-fns](https://date-fns.org/)

## Installation

```js
npm i -S @devtanc/daterange
// or
yarn add @devtanc/daterange
```

## Usage

### Calendar Ranges

This function is for generating ranges that conform to calendar units like days, weeks, months, quarters, or years. The return object is in the form of:

```js
{
  start: Date,
  end: Date
}
```

```js
import { getCalendarRange } from '@devtanc/daterange'
// Arguments are (unit, shift, date). Only the unit is required (plural or singular are treated the same)
// A positive shift means going BACK in time (like 6 days ago), negative goes forward
// If no date or shift is provided, it is assumed that you want the current "unit" up until the current date/time
// e.g. getCalendarRange('day', 0)  Would give you this week up until the current time, as opposed to until the end of the week

getCalendarRange('day')
// {
//   start: beginning of today,
//   end: now
// }

getCalendarRange('day', 2)
// {
//   start: beginning of the day, two days ago,
//   end: end of the day, two days ago
// }

getCalendarRange('month', 0, new Date(2017, 2, 12))
// {
//   start: beginning of the month of March, 2017,
//   end: end of the month of March, 2017
// }

getCalendarRange('month', 1, new Date(2017, 2, 12))
// The difference in the month here is due to the provided shift value
// {
//   start: beginning of the month of February, 2017,
//   end: end of the month of February, 2017
// }

```
