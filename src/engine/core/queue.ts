export class Queue<T>
{
  private _queue: T[];

  // Number of elements currently in the queue.
  private _length: number;

  // Maximum elements the queue can contain.
  private readonly _maxSize: number;

  get queue() { return this._queue; }

  constructor(maxSize: number)
  {
    this._length = 0;
    this._maxSize = maxSize > 0 ? maxSize : 10;
    this._queue = new Array<T>(this._maxSize);
  }

  isEmpty(): boolean { return this._length === 0; }

  isFull(): boolean { return this._length === this._maxSize; }

  enqueue(item: T): void 
  {
    if (this.isFull()) {
      throw new Error('Queue overflow!');
    } else {
      this._queue[this._length++] = item;
    }
  }

  dequeue(): T 
  {
    if (this.isEmpty()) {
      throw new Error('Queue underflow!');
    }

    const retval = this._queue[0];

    for (let i = 0; i < this._length; i++) {
      this._queue[i] = this._queue[i + 1];
    }

    this._length--;

    return retval;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.');
    }

    return this._queue[0];
  }

  queueContents(): void 
  {
    console.log('Queue Contents:');
    for (let i = 0; i < this._length; ++i) {
      console.log(`queue[${i}]: ${this._queue[i]}`)
    }
  }
}