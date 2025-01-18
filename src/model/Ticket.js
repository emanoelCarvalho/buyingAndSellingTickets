"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ticket = /** @class */ (function () {
    function Ticket(client, event, session, seat) {
        this.client = client;
        this.event = event;
        this.session = session;
        this.seat = seat;
    }
    Ticket.prototype.getClient = function () {
        return this.client;
    };
    Ticket.prototype.getEvent = function () {
        return this.event;
    };
    Ticket.prototype.getSession = function () {
        return this.session;
    };
    Ticket.prototype.getSeat = function () {
        return this.seat;
    };
    Ticket.prototype.toString = function () {
        return "Ticket: ".concat(this.client.getName(), " - ").concat(this.event.getName(), " - ").concat(this.session, " - ").concat(this.seat);
    };
    return Ticket;
}());
exports.default = Ticket;
