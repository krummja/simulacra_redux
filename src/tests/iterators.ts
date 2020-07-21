

class IterableBase<T> implements Iterable<T>
{
  [Symbol.iterator](): Iterator<T> { return }
}