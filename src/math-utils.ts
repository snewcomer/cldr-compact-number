/**
 * Meant to either localize a number with toLocaleString or return an Integer
 * localization accepts 3 arguments
 *  - significantDigits
 *  - minimumFractionDigits
 *  - maximumFractionDigits
 */
export function normalizeNumber(
  decimal: number,
  arbitraryPrecision: number,
  sign: number,
  locale: string,
  {
    significantDigits = 0,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  }
): string | number | undefined {
  if (significantDigits) {
    return toLocaleFixed(toFixed(decimal, significantDigits), locale, {
      maximumFractionDigits,
      minimumFractionDigits
    });
  }

  return withRounding(decimal, arbitraryPrecision) * sign;
}

export function extractIntPart(
  decimal: number,
  range: number,
  numberOfDigits: number
): number {
  // 1734 -> 1.734
  // 17345 -> 17.345
  // 999949 -> 999.9K with one significant digit or 999,9 mil in Spanish
  // this gives us the "int" (LHS) part of the number with the remains on the RHS
  return (decimal / range) * Math.pow(10, numberOfDigits - 1);
}

function toFixed(decimal: number, significantDigits: number): number {
  // solves issues with toFixed returning a string
  // e.g. 999.94 -> 999.9
  // e.g. 999.95 -> 1000 instead of (999.95).toFixed(1) -> '1000.1'
  const powOf10 = Math.pow(10, significantDigits);
  return Math.round(decimal * powOf10) / powOf10;
}

function withRounding(decimal: number, arbitraryPrecision: number): number {
  if (decimal <= 1) {
    // We do not want to round up to nearest 10 (Math.pow(10, 1)) when < 1.
    // Just round decimal
    return Math.round(decimal);
  }

  // rounding on floating point numbers
  // e.g. 99.5 -> 100
  const powOf10 = Math.pow(10, arbitraryPrecision);
  return Math.round(decimal / powOf10) * powOf10;
}

function toLocaleFixed(
  value: number,
  locale: string,
  digitsConfig: object
): string | undefined {
  if (value && typeof value === 'number') {
    return value.toLocaleString(locale, digitsConfig);
  }
}
