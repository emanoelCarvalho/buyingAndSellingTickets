import Client from "./client";

class Event {
  private static countId = 1;
  private id: number;
  public name: string;
  public type: string;
  public artists: string[];
  public date: Date;
  public session: string;
  public capacity: number;
  public queue: Client[] = [];

  constructor(
    name: string,
    type: string,
    artists: string[],
    date: Date,
    session: string,
    capacity: number
  ) {
    this.id = Event.countId++;
    this.name = name;
    this.type = type;
    this.artists = artists;
    this.date = date;
    this.session = session;
    this.capacity = capacity;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getType(): string {
    return this.type;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public getArtists(): string[] {
    return this.artists;
  }

  public setArtists(artists: string[]): void {
    this.artists = artists;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getSession(): string {
    return this.session;
  }

  public setSession(session: string): void {
    this.session = session;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public setCapacity(capacity: number): void {
    this.capacity = capacity;
  }

  public addClientToQueue(client: Client): void {
    this.queue.push(client);
  }

  // Método para remover cliente da fila
  public removeClientFromQueue(client: Client): void {
    this.queue = this.queue.filter(c => c !== client);
  }

  // Método para acessar a fila
  public getQueue(): Client[] {
    return this.queue;
  }

  public toString(): string {
    return `Event: ${this.id} - ${this.name} - ${this.type} - ${this.artists} - ${this.date} - ${this.session} - ${this.capacity}`;
  }
}

export default Event;
