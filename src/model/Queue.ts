import type Client from "./Client";

class NodeOfQueue {
  private client: Client;
  private priority: boolean;
  private next: NodeOfQueue | null;

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
