import type { ZeneithDatabaseCreationData } from "./Meta/Database/Database.types.js";
import { ZeneithDBCore } from "./ZeneithDBCore.js";
export declare const ZeneithDB: {
    __version: number;
    core: ZeneithDBCore;
    $INIT: () => Promise<void>;
    databaseExists: (dataBaseName: string) => Promise<boolean>;
    createDatabase: (data: ZeneithDatabaseCreationData) => Promise<import("./index.js").DataBase>;
    updateDatabase: (data: ZeneithDatabaseCreationData) => Promise<import("./index.js").DataBase>;
    getDatabase: (name: string) => Promise<import("./index.js").DataBase>;
    deleteDatabase: (name: string) => Promise<false | undefined>;
};
