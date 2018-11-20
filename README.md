cldr-compact-number
==============================================================================
![Download count all time](https://img.shields.io/npm/dt/cldr-compact-number.svg)
[![npm version](https://badge.fury.io/js/cldr-compact-number.svg)](http://badge.fury.io/js/cldr-compact-number)

[![Dependency Status](https://david-dm.org/snewcomer/cldr-compact-number.svg)](https://david-dm.org/snewcomer/cldr-compact-number)
[![devDependency Status](https://david-dm.org/snewcomer/cldr-compact-number/dev-status.svg)](https://david-dm.org/snewcomer/cldr-compact-number#info=devDependencies)

Short number formatting based on CLDR locale data.  Particularly useful for __statistical data__, showing financial numbers in __charts__, and __abbreviating number of ratings__ across a range of languages.

- `1234` is converted to `1K` in English
- `101234` is converted to `101K` in English and `101.1K` if need 1 significant digit
- `1234` is converted to `1 mil` in Espanol
- `101234` is converted to `101,1 mil` in Espanol if need 1 significant digit
- `1234` is converted to `1234` in Japanese

Depends on data from [cldr-numbers-full](https://github.com/unicode-cldr/cldr-numbers-full). Here is the related proposal for [Compact Decimal Format](https://github.com/tc39/ecma402/issues/37) that this addon is based on.  This is why there are no browser API's baked into something like `Intl.NumberFormat`.

Installation
------------------------------------------------------------------------------

```
npm install cldr-compact-number --save
```

Usage
------------------------------------------------------------------------------
The following APIs take the language code as the the second argument based on [ISO 639-1](http://www.loc.gov/standards/iso639-2/php/code_list.php).  You can also pass `en_GB` and we will normalize it to `en-GB` as well.

### API

```js
import compactFormat from 'cldr-compact-number';

compactFormat(19634, 'en', localeData);
// 19K
```

```js
compactFormat(19634, 'en', localeData, { significantDigits: 1, minimumFractionDigits: 1, maximumFractionDigits: 2 });
// 19.6K
```

```js
compactFormat(101, 'en', localeData, { significantDigits: 1, financialFormat: true });
// 0.1M
```

```js
compactFormat(19634, 'ja', localeData);
// 2万
```

```js
compactFormat(19634, 'es', localeData, { significantDigits: 1 });
// 19,6 mil
```

* Note when using significantDigits, this addon utilizes [`toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).


### Long Formatting

"Wait, I thought this addon was for compact number formatting?" Well it can be a misnomer depending on the language.  Let's look at some examples.

This doesn't seem shorter!!!! (╯°□°）╯︵ ┻━┻
```js
compactFormat(101000, 'en', localeData, { long: true });
// 101 thousand
```

But this does! ʘ‿ʘ
```js
compactFormat(101000, 'ja', localeData, { long: true });
// 101万
```

So we will just go with `cldr-compact-number` for now.


Other
------------------------------------------------------------------------------
Currently this only shortens with latin digits 0..9

For your information, known number systems include:

[adlm, ahom, arab, arabext, armn, armnlow, bali, beng, bhks, brah,
 cakm, cham, cyrl, deva, ethi, fullwide, geor, grek, greklow, gujr,
 guru, hanidays, hanidec, hans, hansfin, hant, hantfin, hebr, hmng,
 java, jpan, jpanfin, kali, khmr, knda, lana, lanatham, laoo, latn,
 lepc, limb, mathbold, mathdbl, mathmono, mathsanb, mathsans, mlym,
 modi, mong, mroo, ...]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:snewcomer/cldr-compact-number.git`
* `cd cldr-compact-number`
* `npm install`

### Running tests

* `npm run test` – Runs the test suite on the current Ember version

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
