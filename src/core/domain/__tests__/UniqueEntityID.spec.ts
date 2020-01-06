import { UniqueEntityID } from '../UniqueEntityID';

describe('UniqueEntityID', () => {
  test('UniqueEntityID.create()', () => {
    const uniqueEntityID = UniqueEntityID.create();

    expect(uniqueEntityID).toBeDefined();
    expect(uniqueEntityID).toBeInstanceOf(UniqueEntityID);
  });

  test('get property "value"', () => {
    const id = Math.random()
      .toString(36)
      .substring(2);

    const uniqueEntityID = UniqueEntityID.create(id);

    expect(uniqueEntityID.value).toBe(id);
  });

  test.each([
    [UniqueEntityID.create(), (null as unknown) as UniqueEntityID, false],
    [UniqueEntityID.create(), (undefined as unknown) as UniqueEntityID, false],
    [UniqueEntityID.create(), UniqueEntityID.create(), false],
    [
      UniqueEntityID.create(),
      ({ _value: '' } as unknown) as UniqueEntityID,
      false,
    ],
  ])(
    '%o.equals(%o)',
    (a: UniqueEntityID, b: UniqueEntityID, expected: boolean) => {
      expect(a.equals(b)).toBe(expected);
    },
  );
});
