import Ramda from 'ramda';

export const isString = (toValidate): boolean => Ramda.is(String, toValidate);
