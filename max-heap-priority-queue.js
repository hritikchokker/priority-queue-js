class Node{
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
      }
}

class MaxHeapPriorityQueue {
    constructor() {
      this.values = [];
    }

    enqueue(value, priority) {
        let newNode = new Node(value, priority);
        this.values.push(newNode);
        this.bubbleUp();
      }


  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority <= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority > element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority > element.priority) ||
          (swap !== null && rightChild.priority > leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

// Test the Priority Queue
let pq = new MaxHeapPriorityQueue();
pq.enqueue("common cold", 5);
pq.enqueue("gunshot wound", 1);
pq.enqueue("high fever", 4);
pq.enqueue("broken arm", 2);
pq.enqueue("glass in foot", 3);

console.log(pq.dequeue()); // Node { value: 'gunshot wound', priority: 1 }
console.log(pq.dequeue()); // Node { value: 'broken arm', priority: 2 }
console.log(pq.dequeue()); // Node { value: 'glass in foot', priority: 3 }
console.log(pq.dequeue()); // Node { value: 'high fever', priority: 4 }
console.log(pq.dequeue()); // Node { value: 'common cold', priority: 5 }