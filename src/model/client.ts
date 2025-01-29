class Client {
  private static countId = 1;
  private id: number;
  public name: string;
  public address: string;
  public cpf: string;
  public dateOfBirth: string;
  public hasConvenio: boolean;

  constructor(
    name: string,
    address: string,
    cpf: string,
    dateOfBirth: string,
    hasConvenio: boolean, 
  ) {
    this.id = Client.countId++;
    this.name = name;
    this.address = address;
    this.cpf = cpf;
    this.dateOfBirth = dateOfBirth;
    this.hasConvenio = hasConvenio; 
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

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  public getDateOfBirth(): string {
    return this.dateOfBirth;
  }

  public setDateOfBirth(dateOfBirth: string): void {
    this.dateOfBirth = dateOfBirth;
  }

  public getHasConvenio(): boolean {
    return this.hasConvenio;
  }

  public setHasConvenio(hasConvenio: boolean): void {
    this.hasConvenio = hasConvenio;
  }

  public toString(): string {
    return `Client: ${this.id} - ${this.name} - ${this.address} - ${this.cpf} - ${this.dateOfBirth} - ${this.hasConvenio}`;
  }
}

export default Client;
