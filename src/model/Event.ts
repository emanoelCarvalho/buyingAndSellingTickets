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

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }

  getArtists(): string[] {
    return this.artists;
  }

  setArtists(artists: string[]): void {
    this.artists = artists;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date;
  }

  getSession(): string {
    return this.session;
  }

  setSession(session: string): void {
    this.session = session;
  }

  getCapacity(): number {
    return this.capacity;
  }

  setCapacity(capacity: number): void {
    this.capacity = capacity;
  }

  public toString(): string {
    return `Event: ${this.id} - ${this.name} - ${this.type} - ${this.artists} - ${this.date} - ${this.session} - ${this.capacity}`;
  }
}

export default Event;
