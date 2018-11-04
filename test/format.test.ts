import { compactFormat } from '../src/format';
import { en, es } from './locale-data';

// due to regex replacement
function replaceWhitespace(val: any) {
  return val.replace(/\s+/, ' ');
}

describe('format number', () => {
  it('returns value if no localeData provided', () => {
    const localeData = {};
    let result = compactFormat(1234, 'en-gb', localeData);
    expect(result).toBe(1234);
    result = compactFormat(1234, 'es-MX', localeData);
    expect(result).toBe(1234);
  });

  it('returns value if localeData provided', () => {
    const localeData = es;
    let result = compactFormat(1234, 'es', localeData);
    expect(replaceWhitespace(result)).toBe('1 mil');
    result = compactFormat(11234, 'es', localeData);
    expect(replaceWhitespace(result)).toBe('11 mil');
    result = compactFormat(94999, 'es', localeData);
    expect(replaceWhitespace(result)).toBe('95 mil');
    result = compactFormat(95000, 'es', localeData);
    expect(replaceWhitespace(result)).toBe('95 mil');
    result = compactFormat(95001, 'es', localeData);
    expect(replaceWhitespace(result)).toBe('100 mil');
    result = compactFormat(100000, 'es', localeData);
    expect(replaceWhitespace(result)).toBe('100 mil');
  });

  it('returns value if threshold provided', () => {
    const localeData = es;
    let result = compactFormat(1234, 'es', localeData, { threshold: 0.1 });
    expect(replaceWhitespace(result)).toBe('1 mil');
    result = compactFormat(11234, 'es', localeData, { threshold: 0.1 });
    expect(replaceWhitespace(result)).toBe('11 mil');
    result = compactFormat(89999, 'es', localeData, { threshold: 0.1 });
    expect(replaceWhitespace(result)).toBe('90 mil');
    result = compactFormat(90001, 'es', localeData, { threshold: 0.1 });
    expect(replaceWhitespace(result)).toBe('90 mil');
    // result = compactFormat(95001, 'es', localeData, { threshold: 0.1 });
    // expect(replaceWhitespace(result)).toBe('100 mil');
  });

  it('returns with significantDigits', () => {
    const localeData = es;
    let result = compactFormat(1234, 'es', localeData, { significantDigits: 1 });
    expect(replaceWhitespace(result)).toBe('1.2 mil');
    result = compactFormat(11234, 'es', localeData, { significantDigits: 1 });
    expect(replaceWhitespace(result)).toBe('11.2 mil');
    result = compactFormat(91934, 'es', localeData, { significantDigits: 2 });
    expect(replaceWhitespace(result)).toBe('91.93 mil');
  });

  it('returns with financial format', () => {
    const localeData = en;
    let result = compactFormat(1234, 'en', localeData, {
      financialFormat: true,
      significantDigits: 1
    });
    expect(replaceWhitespace(result)).toBe('1.2K');
    result = compactFormat(101000, 'en', localeData, {
      financialFormat: true,
      significantDigits: 1
    });
    expect(replaceWhitespace(result)).toBe('0.1M');
  });
});
