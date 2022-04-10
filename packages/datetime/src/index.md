---
reference: datetime
---

@# Datetime

The [__@blueprint-modernized/datetime__ NPM package](https://www.npmjs.com/package/@blueprint-modernized/datetime)
provides several components for interacting with dates and times:

- [`DatePicker`](#datetime/datepicker) for selecting a single date (day, month, year).

- [`DateRangePicker`](#datetime/daterangepicker) for selecting date ranges.

- [`TimePicker`](#datetime/timepicker) for selecting a time (hour, minute, second,
  millisecond).

- [`DateTimePicker`](#datetime/datetimepicker), which composes `DatePicker` and
  `TimePicker` to select a date and time together.

- [`DateInput`](#datetime/dateinput), which composes a text input with a `DatePicker` in
  a `Popover`, for use in forms.

- [`DateRangeInput`](#datetime/daterangeinput), which composes two text inputs with a `DateRangePicker` in
  a `Popover`, for use in forms.

Make sure to review the [getting started docs for installation info](#blueprint/getting-started).

```sh
npm install --save @blueprint-modernized/datetime
```

Import CSS with a JS bundler like webpack:

```js
@import "~@blueprint-modernized/datetime/lib/css/blueprint-datetime.css";
```

...or in plain HTML:

```html
<link href="path/to/node_modules/@blueprint-modernized/datetime/lib/css/blueprint-datetime.css" rel="stylesheet" />
```

@page datepicker
@page daterangepicker
@page timepicker
@page datetimepicker
@page dateinput
@page daterangeinput
