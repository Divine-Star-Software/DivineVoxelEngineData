import { ZeneithDBCore } from "./ZeneithDBCore.js";
export const ZeneithDB = {
    __version: 0.1,
    core: new ZeneithDBCore(),
    $INIT: async function () {
        await this.core.initialize();
    },
    databaseExists: async function (dataBaseName) {
        return await this.core.checkIfDatabaseExists(dataBaseName);
    },
    createDatabase: async function (data) {
        return this.core.createDatabase(data);
    },
    updateDatabase: function (data) {
        return this.core.createDatabase(data);
    },
    getDatabase: function (name) {
        return this.core.getDatabase(name);
    },
    deleteDatabase: function (name) {
        return this.core.deleteDatabase(name);
    },
};
ZeneithDB.core.zeneith = ZeneithDB;
