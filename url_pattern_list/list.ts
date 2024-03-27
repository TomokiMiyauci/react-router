export class List<T> implements Iterable<T> {
  #list: T[] = [];
  append(input: T): void {
    this.#list.push(input);
  }

  contain(input: T): boolean {
    return this.#list.includes(input);
  }

  isEmpty(): boolean {
    return !this.#list.length;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.#list[Symbol.iterator]();
  }
}
