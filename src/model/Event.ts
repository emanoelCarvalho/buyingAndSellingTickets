class Event {
  private static countId = 1;
  private id: number;
  private name: string;
  private type: string;
  private artists: string[];
  private date: Date;
  private session: string;
  private capacity: number;

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

  public toString(): string {
    return `Event: ${this.id} - ${this.name} - ${this.type} - ${this.artists} - ${this.date} - ${this.session} - ${this.capacity}`;
  }
}

export default Event;
