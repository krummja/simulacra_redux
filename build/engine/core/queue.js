"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor(maxSize) {
        this._length = 0;
        this._maxSize = maxSize > 0 ? maxSize : 10;
        this._queue = new Array(this._maxSize);
    }
    isEmpty() { return this._length === 0; }
    isFull() { return this._length === this._maxSize; }
    enqueue(item) {
        if (this.isFull()) {
            throw new Error('Queue overflow!');
        }
        else {
            this._queue[this._length++] = item;
        }
    }
    dequeue() {
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
    peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty.');
        }
        return this._queue[0];
    }
    queueContents() {
        console.log('Queue Contents:');
        for (let i = 0; i < this._length; ++i) {
            console.log(`queue[${i}]: ${this._queue[i]}`);
        }
    }
}
exports.Queue = Queue;
