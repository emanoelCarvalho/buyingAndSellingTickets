"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(name, type, artists, date, session, capacity) {
        this.id = Event.countId++;
        this.name = name;
        this.type = type;
        this.artists = artists;
        this.date = date;
        this.session = session;
        this.capacity = capacity;
    }
    Event.prototype.getName = function () {
        return this.name;
    };
    Event.prototype.setName = function (name) {
        this.name = name;
    };
    Event.prototype.getType = function () {
        return this.type;
    };
    Event.prototype.setType = function (type) {
        this.type = type;
    };
    Event.prototype.getArtists = function () {
        return this.artists;
    };
    Event.prototype.setArtists = function (artists) {
        this.artists = artists;
    };
    Event.prototype.getDate = function () {
        return this.date;
    };
    Event.prototype.setDate = function (date) {
        this.date = date;
    };
    Event.prototype.getSession = function () {
        return this.session;
    };
    Event.prototype.setSession = function (session) {
        this.session = session;
    };
    Event.prototype.getCapacity = function () {
        return this.capacity;
    };
    Event.prototype.setCapacity = function (capacity) {
        this.capacity = capacity;
    };
    Event.prototype.toString = function () {
        return "Event: ".concat(this.id, " - ").concat(this.name, " - ").concat(this.type, " - ").concat(this.artists, " - ").concat(this.date, " - ").concat(this.session, " - ").concat(this.capacity);
    };
    Event.countId = 1;
    return Event;
}());
exports.default = Event;
