import { UniqueEntityId } from '../unique-entity-id';

describe('UniqueEntityId', () => {
  test('UniqueEntityId.create()', () => {
    const uniqueEntityID = UniqueEntityId.create();

    expect(uniqueEntityID).toBeDefined();
    expect(uniqueEntityID).toBeInstanceOf(UniqueEntityId);
  });

  test('get property "value"', () => {
    const id = Math.random()
      .toString(36)
      .substring(2);

    const uniqueEntityID = UniqueEntityId.create(id);

    expect(uniqueEntityID.value).toBe(id);
  });

  test.each([
    [UniqueEntityId.create(), (null as unknown) as UniqueEntityId, false],
    [UniqueEntityId.create(), (undefined as unknown) as UniqueEntityId, false],
    [UniqueEntityId.create(), UniqueEntityId.create(), false],
    [
      UniqueEntityId.create(),
      ({ _value: '' } as unknown) as UniqueEntityId,
      false,
    ],
  ])(
    '%o.equals(%o)',
    (a: UniqueEntityId, b: UniqueEntityId, expected: boolean) => {
      expect(a.equals(b)).toBe(expected);
    },
  );
});
