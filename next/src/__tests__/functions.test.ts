import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
} from '@/shared/lib/constants';
import {
  getUpdatedValues,
  makeErrorText,
  testString,
} from '@/shared/lib/utils';
import d from '@/shared/locales/dictionary';
import { LangList } from '@/shared/locales/types';
import { IMenuItem } from '@/widgets/SideBar/types';
import { checkActiveLink } from '@/widgets/SideBar/utils';

describe('checkActiveLink function', () => {
  test('checkActiveLink should return true if link found in the navigation tree', () => {
    const tree1: IMenuItem = {
      text: 'link1',
      href: '/test',
      childs: [{ text: 'link2', href: '/bad' }],
    };
    expect(checkActiveLink('/test?some=param', tree1)).toBe(true);
    expect(checkActiveLink('/', tree1)).toBe(false);

    const tree2: IMenuItem = {
      text: 'link1',
      href: '/bad',
      childs: [{ text: 'link2', href: '/test' }],
    };
    expect(checkActiveLink('/test/item', tree2)).toBe(true);

    const tree4: IMenuItem = {
      text: 'link1',
      href: '/bad',
      childs: [{ text: 'link2', href: '/bad/item' }],
    };
    expect(checkActiveLink('/test', tree4)).toBe(false);

    const tree5: IMenuItem = {
      text: 'link1',
      href: '/bad',
      childs: [{ text: 'link2', href: '/item/test' }],
    };
    expect(checkActiveLink('/test', tree5)).toBe(false);
  });
});

describe('testString function', () => {
  test('testString should return true for valid string with name pattern', () => {
    expect(testString(NAME_REGEX, 'valid string')).toBe(true);
    expect(testString(NAME_REGEX, 'v')).toBe(true);
    expect(testString(NAME_REGEX, '1')).toBe(true);
    expect(testString(NAME_REGEX, 'valid string!')).toBe(false);
    expect(testString(NAME_REGEX, '')).toBe(false);
    expect(
      testString(NAME_REGEX, new Array(8).fill('valid string').join(' '))
    ).toBe(false);
  });
  test('testString should return true for valid string with email pattern', () => {
    expect(testString(EMAIL_REGEX, 'valid_email@example.com')).toBe(true);
    expect(testString(EMAIL_REGEX, 'v@e.co')).toBe(true);
    expect(testString(EMAIL_REGEX, '1@2.34')).toBe(true);
    expect(testString(EMAIL_REGEX, '*&^@example.com')).toBe(false);
    expect(testString(EMAIL_REGEX, 'example@*&^.com')).toBe(false);
    expect(testString(EMAIL_REGEX, 'example@example.*&^')).toBe(false);
    expect(testString(EMAIL_REGEX, '@example.com')).toBe(false);
    expect(testString(EMAIL_REGEX, 'valid_email@.com')).toBe(false);
    expect(testString(EMAIL_REGEX, 'valid_email@example.c')).toBe(false);
    expect(testString(EMAIL_REGEX, '')).toBe(false);
  });
  test('testString should return true for valid string with password pattern', () => {
    expect(testString(PASSWORD_REGEX, '!Q1q2w3e4r')).toBe(true);
    expect(testString(PASSWORD_REGEX, '1Q1q2w3e4r')).toBe(false);
    expect(testString(PASSWORD_REGEX, '!q1q2w3e4r')).toBe(false);
    expect(testString(PASSWORD_REGEX, '!Q!Q@W#E$R')).toBe(false);
    expect(testString(PASSWORD_REGEX, '')).toBe(false);
    expect(
      testString(PASSWORD_REGEX, new Array(10).fill('!Q1q2w3e4r').join(' '))
    ).toBe(false);
  });
});

describe('getUpdatedValues function', () => {
  test('getUpdatedValues should return valid object', () => {
    const obj = {
      field1: 'value1',
      field2: 'value2',
    };

    const newObj1: Partial<typeof obj> = {
      field1: 'NEW VALUE',
    };
    expect(getUpdatedValues(obj, newObj1)).toEqual({ field1: 'NEW VALUE' });

    const newObj2: Partial<typeof obj> = {
      field1: 'NEW VALUE',
      field2: 'value2',
    };
    expect(getUpdatedValues(obj, newObj2)).toEqual({ field1: 'NEW VALUE' });

    const newObj3: Partial<typeof obj> = {};
    expect(getUpdatedValues(obj, newObj3)).toEqual({});
  });
});

describe('makeErrorText function', () => {
  test('makeErrorText should return valid error message', () => {
    const lang: LangList = 'en';
    expect(makeErrorText(undefined, lang)).toBe(d[lang].unknownError);
    expect(makeErrorText('error', lang)).toBe(d[lang].unknownError);
    expect(makeErrorText(404, lang)).toBe(d[lang].unknownError);
    expect(makeErrorText({ status: 429, data: 'error' }, lang)).toBe(
      d[lang].tooManyRequests
    );
    expect(makeErrorText({ status: 100, data: 'error' }, lang)).toBe(
      d[lang].unknownError
    );
    expect(
      makeErrorText({ status: 100, data: { message: 'error' } }, lang)
    ).toBe('error');
    expect(
      makeErrorText(
        { status: 100, data: { message: ['error1', 'error2', 'error3'] } },
        lang
      )
    ).toBe('error1.\r\nerror2.\r\nerror3.');
  });
});
