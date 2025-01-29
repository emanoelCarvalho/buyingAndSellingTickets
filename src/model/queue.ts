import type Client from "./client";
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
  }

  public getInQueue(client: Client): void {
    const newNode = new NodeOfQueue(client);

    if (!this.start || newNode.client.hasConvenio) {
      // Se a fila estiver vazia ou se o cliente tem prioridade, ele vai para o início da fila
      newNode.next = this.start;
      this.start = newNode;

      // Se a fila estava vazia, o novo nó será também o final da fila
      if (!this.end) {
        this.end = newNode;
      }
    } else {
      // Caso contrário, insere no final da fila
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

export default Queue;
