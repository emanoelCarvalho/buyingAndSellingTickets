import type Client from "./client";
import type Event from "./event";

class Ticket {
  public client: Client;
  public event: Event;
  public session: string;
  public seat: string;

  constructor(client: Client, event: Event, session: string, seat: string) {
    this.client = client;
    this.event = event;
    this.session = session;
    this.seat = seat;
  }

  public getClient(): Client {
    return this.client;
  }

  public getEvent(): Event {
    return this.event;
  }

  public getSession(): string {
    return this.session;
  }

  public getSeat(): string {
    return this.seat;
  }

  toString(): string {
    return `Ticket: ${this.client.getName()} - ${this.event.getName()} - ${
      this.session
    } - ${this.seat}`;
  }
}

export default Ticket;