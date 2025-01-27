import type Client from "../client";

interface IQueue {
    getInQueue(client: Client): void;
    removeFromQueue(): Client | null;
    listQueue(): Client[];
}

export type { IQueue };