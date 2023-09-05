import "server-only";


import {  getLocale } from './context';
import getDictionary from './dictionaries';
import _get from 'lodash.get';

export async function getServerTranslations() {
  const locale = getLocale();
  const translations = await getDictionary(locale);


  return function (path = '') {
    return _get(translations, path);
  }
}