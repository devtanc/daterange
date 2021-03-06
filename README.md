# daterange

A library for generating past date ranges as a simple wrapper around [date-fns](https://date-fns.org/)

[![npm (scoped)](https://img.shields.io/npm/v/@devtanc/daterange.svg)](https://www.npmjs.com/package/@devtanc/daterange)
[![CircleCI](https://img.shields.io/circleci/project/github/devtanc/daterange.svg)](https://circleci.com/gh/devtanc/daterange)
[![GitHub issues](https://img.shields.io/github/issues/devtanc/daterange.svg)](https://github.com/devtanc/daterange/issues)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Installation

```js
npm i -S @devtanc/daterange
// or
yarn add @devtanc/daterange
```

## Usage

### Calendar Ranges

This function is for generating ranges in the past that conform to calendar units like days, weeks, months, quarters, or years. This library does not currently handle ranges in the future. The return object is in the form of:

```js
{
  start: Date,
  end: Date
}
```

```js
import {
  getCalendarRange,
  getCustomRangeEnding,
  getCustomRangeStarting,
} from '@devtanc/daterange'
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

getCalendarRangeStarting(new Date(2018, 0, 1), 5, 'days')
// A range starting on the given date and extending past it x number of units
// {
//   start: new Date(2018, 0, 1),
//   end: new Date(2018, 0, 6),
// }

getCustomRangeEnding(new Date(2018, 0, 1), 5, 'days')
// A range starting on the given date and extending past it x number of units
// {
//   start: new Date(2017, 11, 27),
//   end: new Date(2018, 0, 1),
// }
```
