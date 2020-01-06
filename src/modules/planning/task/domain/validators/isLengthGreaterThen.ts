import Ramda from 'ramda';

export const isLengthGreaterThen = Ramda.curry(
  (length: number, toValidate): boolean => toValidate.length > length,
);
