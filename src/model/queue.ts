import Client from "./client";
import type { IQueue } from "./interface/iqueue";
class NodeOfQueue {
  public client: Client;
  public next: NodeOfQueue | null;

  constructor(client: Client) {
    this.client = client;
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
}

class Queue implements IQueue {
  public start: NodeOfQueue | null;
  public end: NodeOfQueue | null;

  constructor() {
    this.start = null;
    this.end = null;

    const initialClients = [
      new Client("Alice", "Rua A, 123", "111.111.111-11", "1990-01-01", false),
      new Client("Bob", "Rua B, 456", "222.222.222-22", "1985-05-12", true),  // Conveniado
      new Client("Charlie", "Rua C, 789", "333.333.333-33", "2000-07-23", false),
      new Client("Diana", "Rua D, 321", "444.444.444-44", "1998-11-30", true),  // Conveniada
    ];

    initialClients.forEach(client => this.getInQueue(client));
  }

  public getInQueue(client: Client): void {
    const newNode = new NodeOfQueue(client);

    if (!this.start || newNode.client.hasConvenio) {
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
      clients.push(current.getClient());
      current = current.next;
    }
    return clients;
  }

  public size(): number {
    let count = 0;
    let current = this.start;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
}

export default Queue;
