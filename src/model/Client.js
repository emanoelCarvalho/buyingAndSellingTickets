"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(name, address, cpf, dateOfBirth, agreement) {
        this.id = Client.countId++;
        this.name = name;
        this.address = address;
        this.cpf = cpf;
        this.dateOfBirth = dateOfBirth;
        this.agreement = agreement;
    }
    Client.prototype.getName = function () {
        return this.name;
    };
    Client.prototype.setName = function (name) {
        this.name = name;
    };
    Client.prototype.getAddress = function () {
        return this.address;
    };
    Client.prototype.setAddress = function (address) {
        this.address = address;
    };
    Client.prototype.getCpf = function () {
        return this.cpf;
    };
    Client.prototype.setCpf = function (cpf) {
        this.cpf = cpf;
    };
    Client.prototype.getDateOfBirth = function () {
        return this.dateOfBirth;
    };
    Client.prototype.setDateOfBirth = function (dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    };
    Client.prototype.getAgreement = function () {
        return this.agreement;
    };
    Client.prototype.setAgreement = function (agreement) {
        this.agreement = agreement;
    };
    Client.prototype.toString = function () {
        return "Client: ".concat(this.id, " - ").concat(this.name, " - ").concat(this.address, " - ").concat(this.cpf, " - ").concat(this.dateOfBirth, " - ").concat(this.agreement);
    };
    Client.countId = 1;
    return Client;
}());
exports.default = Client;
