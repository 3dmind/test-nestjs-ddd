import { Left } from './Left';
import { Right } from './Right';

export type Either<L, A> = Left<L, A> | Right<L, A>;

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};

export function eitherLeft<L, A>(l: L): Either<L, A> {
  return new Left<L, A>(l);
}

export function eitherRight<L, A>(a: A): Either<L, A> {
  return new Right<L, A>(a);
}
