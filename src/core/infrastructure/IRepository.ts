export interface IRepository<T> {
  exists(t: T): Promise<boolean>;
  save(t: T): Promise<T>;
}
