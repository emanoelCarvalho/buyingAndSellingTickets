"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var NodeOfQueue = /** @class */ (function () {
    function NodeOfQueue(client, priority) {
        if (priority === void 0) { priority = false; }
        this.client = client;
        this.priority = priority;
        this.next = null;
    }
    NodeOfQueue.prototype.getClient = function () {
        return this.client;
    };
    NodeOfQueue.prototype.setNext = function (node) {
        this.next = node;
    };
    NodeOfQueue.prototype.getNext = function () {
        return this.next;
    };
    NodeOfQueue.prototype.isPriority = function () {
        return this.priority;
    };
    NodeOfQueue.prototype.setPriority = function (priority) {
        this.priority = priority;
    };
    return NodeOfQueue;
}());
var Queue = /** @class */ (function () {
    function Queue() {
        this.start = null;
        this.end = null;
    }
    Queue.prototype.getInQueue = function (client, priority) {
        if (priority === void 0) { priority = false; }
        var newNode = new NodeOfQueue(client, priority);
        if (!this.start || priority) {
            newNode.next = this.start;
            this.start = newNode;
            if (!this.end) {
                this.end = newNode;
            }
        }
        else {
            var current = this.start;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
            this.end = newNode;
        }
    };
    Queue.prototype.removeFromQueue = function () {
        if (!this.start) {
            return null;
        }
        var clientRemoved = this.start.getClient();
        this.start = this.start.next;
        if (!this.start) {
            this.end = null;
        }
        return clientRemoved;
    };
    Queue.prototype.listQueue = function () {
        var clients = [];
        var current = this.start;
        while (current) {
            clients = __spreadArray(__spreadArray([], clients, true), [current.getClient()], false);
            current = current.next;
        }
        return clients;
    };
    return Queue;
}());
exports.default = Queue;
