export function replaceNumber(normalized: any, format: string): string {
  // 1.734 -> 1K
  // replace 0's with absolute number while preserving space and remaining text
  // return format.replace(/0*(\s*)(\w+)/, Math.round(number) + '$1$2');
  return format.replace(/0*/, normalized);
}

export function polishString(str: string): string {
  return str.replace("'.'", '.');
}

export function normalizeLocale(locale: string | string[]): string {
  if (locale instanceof Array) {
    return locale[0].replace(/_/, '-').toLowerCase();
  }
  return locale.replace(/_/, '-').toLowerCase();
}

/**
 * If rule only contains 0, it indicates no short number formatting applied
 * e.g. "ja" 1234 -> 1234 and not 1K
 */
export function needsFormatting(format: string): RegExpMatchArray | null {
  return format.match(/[^0]/);
}

/**
 * Given a format: { af: {locale: "af", numbers: {…}} af-na: {locale: "af-NA", parentLocale: "af"} }
 * recursively find numbers hash
 *
 * @method findLocaleData
 * @param localeData
 * @param locale
 */
export function findLocaleData(
  localeData: any,
  locale: string | string[]
): object | undefined {
  locale = Array.isArray(locale) ? locale[0] : locale;
  const topLevelData =
    localeData[locale] || localeData[normalizeLocale(locale)];
  if (!topLevelData) {
    return;
  }

  let numbersHash = topLevelData.numbers;
  const parentLocale = topLevelData.parentLocale;

  if (!numbersHash && parentLocale) {
    numbersHash = findLocaleData(localeData, parentLocale);
  }

  return numbersHash;
}

export function findMatchingLocale(
  localeData: any,
  locale: string | string[]
): object | undefined {
  locale = Array.isArray(locale) ? locale[0] : locale;
  const topLevelData =
    localeData[locale] || localeData[normalizeLocale(locale)];
  if (!topLevelData) {
    return;
  }

  let numbersHash = topLevelData.numbers;
  const parentLocale = topLevelData.parentLocale;

  if (!numbersHash && parentLocale) {
    numbersHash = findLocaleData(localeData, parentLocale);
  }

  return numbersHash;
}
