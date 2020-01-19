export interface Repository<T> {
  exists(entity: T): Promise<boolean>;
  save(entity: T): Promise<T>;
}
