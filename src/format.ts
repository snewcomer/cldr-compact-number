import enLocaleData from '../locales/en';
import {
  findLocaleData,
  needsFormatting,
  normalizeLocale,
  polishString,
  replaceNumber
} from './format-utils';
import { extractIntPart, normalizeNumber } from './math-utils';

export function compactFormat(
  value: number | string,
  locale: string | string[],
  localeData?: object,
  options: any = {}
): string | number | undefined {
  let num = Number(value);
  if (!value || typeof num !== 'number') {
    return value;
  }

  localeData = { ...enLocaleData, ...localeData };

  // figure out which numbers hash based on the locale
  const data: any | undefined = findLocaleData(localeData, locale);
  if (!data) {
    return value;
  }

  // take the absolute value and stash sign to apply at end
  let sign = 1;
  if (num < 0) {
    sign = -1;
    num = Math.abs(num);
  }

  // find specific rules: short or long
  const {
    financialFormat = false,
    long = false,
    significantDigits = 0,
    threshold = 0.05
  } = options;
  const rules = long ? data.decimal.long : data.decimal.short;
  if (!rules || num < 1000) {
    return value;
  }

  // 1. Take number and determine range it is in
  // 2. Extract specific rule from hash - ["0K", 1] meaning which value from the rule and number of zeros
  let matchingRule;
  let arbitraryPrecision = 0;
  for (let i = 0; i <= rules.length; i++) {
    if (num <= rules[i][0]) {
      const [testRangeHigh] = rules[i];
      // always use previous rule until within 5% threshold of upper limit
      if (!financialFormat && 1 - num / testRangeHigh > threshold) {
        // e.g use 950K instead of 1M
        // e.g use 101K instead of 0.1M
        matchingRule = rules[i - 1];
      } else {
        matchingRule = rules[i];
        if (!significantDigits || !financialFormat) {
          // if we want to round up, we need to prevent numbers like 99,499 from rounding down to 99K
          // /-private/math-utils will use this variable to round a number like 91 to 100 since we are within the threshold
          arbitraryPrecision = 1;
        }
      }
      break;
    }
  }

  // 3. Normalise number by converting to decimal and cropping to number of digits
  //  1000 -> 1.000 -> 1K
  //  1600 -> 1.600 -> 2K
  // 4. Format according to formatter e.g. "0K"
  const [range, opts] = matchingRule;
  // cldr data is either `one` or `other`.  Defaulting to `one` for now
  const [formatter, numberOfDigits] = opts.one || opts.other;

  if (!needsFormatting(formatter)) {
    return value;
  }

  const normalizedLocale: string = normalizeLocale(locale);
  const normalized = normalizeNumber(
    extractIntPart(num, range, numberOfDigits),
    arbitraryPrecision,
    sign,
    normalizedLocale,
    options
  );

  return polishString(replaceNumber(normalized, formatter));
}
