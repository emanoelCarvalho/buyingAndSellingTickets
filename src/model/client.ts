class Client {
  private static countId = 1;
  private id: number;
  public name: string;
  public address: string;
  public cpf: string;
  public dateOfBirth: string;
  public agreement: boolean;
  public hasConvenio: boolean; // Adicionado campo para convênio

  constructor(
    name: string,
    address: string,
    cpf: string,
    dateOfBirth: string,
    agreement: boolean,
    hasConvenio: boolean // Novo parâmetro
  ) {
    this.id = Client.countId++;
    this.name = name;
    this.address = address;
    this.cpf = cpf;
    this.dateOfBirth = dateOfBirth;
    this.agreement = agreement;
    this.hasConvenio = hasConvenio; // Inicializando o novo campo
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

  public getAgreement(): boolean {
    return this.agreement;
  }

  public setAgreement(agreement: boolean): void {
    this.agreement = agreement;
  }

  public getHasConvenio(): boolean {
    return this.hasConvenio;
  }

  public setHasConvenio(hasConvenio: boolean): void {
    this.hasConvenio = hasConvenio;
  }

  public toString(): string {
    return `Client: ${this.id} - ${this.name} - ${this.address} - ${this.cpf} - ${this.dateOfBirth} - ${this.agreement} - ${this.hasConvenio}`;
  }
}

export default Client;
