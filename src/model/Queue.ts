import type Client from "./Client";

class NodeOfQueue {
  private client: Client;
  private priority: boolean;
  public next: NodeOfQueue | null;

  constructor(client: Client, priority: boolean = false) {
    this.client = client;
    this.priority = priority;
    this.next = null;
  }

  public getClient(): Client {
    return this.client;
  }

  public setNext(node: NodeOfQueue): void {
    this.next = node;
  }

  public getNext(): NodeOfQueue | null {
    return this.next;
  }

  public isPriority(): boolean {
    return this.priority;
  }

  public setPriority(priority: boolean): void {
    this.priority = priority;
  }
}

class Queue {
  private start: NodeOfQueue | null;
  private end: NodeOfQueue | null;

  constructor() {
    this.start = null;
    this.end = null;
  }

  public getInQueue(client: Client, priority: boolean = false): void {
    const newNode = new NodeOfQueue(client, priority);

    if (!this.start || priority) {
      newNode.next = this.start;
      this.start = newNode;
      if (!this.end) {
        this.end = newNode;
      }
    } else {
      let current = this.start;

      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      this.end = newNode;
    }
  }

  public removeFromQueue(): Client | null {
    if (!this.start) {
      return null;
    }

    const clientRemoved = this.start.getClient();

    this.start = this.start.next;
    if (!this.start) {
      this.end = null;
    }

    return clientRemoved;
  }

  public listQueue(): Client[] {
    let clients: Client[] = [];
    let current = this.start;

    while (current) {
      clients = [...clients, current.getClient()];
      current = current.next;
    }

    return clients;
  }
}
