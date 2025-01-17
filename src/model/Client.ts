class Client {
  private static countId = 1;
  private id: number;
  private name: string;
  private address: string;
  private cpf: string;
  private dateOfBirth: string;
  private agreement: boolean;

  constructor(
    name: string,
    address: string,
    cpf: string,
    dateOfBirth: string,
    agreement: boolean
  ) {
    this.id = Client.countId++;
    this.name = name;
    this.address = address;
    this.cpf = cpf;
    this.dateOfBirth = dateOfBirth;
    this.agreement = agreement;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  getCpf(): string {
    return this.cpf;
  }

  setCpf(cpf: string): void {
    this.cpf = cpf;
  }

  getDateOfBirth(): string {
    return this.dateOfBirth;
  }

  setDateOfBirth(dateOfBirth: string): void {
    this.dateOfBirth = dateOfBirth;
  }

  getAgreement(): boolean {
    return this.agreement;
  }

  setAgreement(agreement: boolean): void {
    this.agreement = agreement;
  }

  public toString(): string {
    return `Client: ${this.id} - ${this.name} - ${this.address} - ${this.cpf} - ${this.dateOfBirth} - ${this.agreement}`;
  }
}

export default { Client };
