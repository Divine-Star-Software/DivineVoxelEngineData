import { DataBase, ZeneithDB } from "zeneithdb";
import { WorldDataBase } from "./DataBase/WorldDataBase.js";

export const DVEDBrowser = {
  async $INIT() {
    await ZeneithDB.$INIT();
  },
  async getWorldDataBase(dbName: string, dimension: string = "main") {
    let db: DataBase;
    const existanceCheck = await ZeneithDB.databaseExists(dbName);
    if (!existanceCheck) {
      db = await ZeneithDB.createDatabase({
        databaseName: dbName,
        collections: [
          {
            name: "world-meta",
            schema: [],
          },
        ],
      });
      WorldDataBase.database = db;
    } else {
      db = await ZeneithDB.getDatabase(dbName);
      WorldDataBase.database = db;
    }
    await WorldDataBase.setDimension(dimension);
    return WorldDataBase;
  },
  async deleteWorldDataBase(dbName: string) {
    await ZeneithDB.deleteDatabase(dbName);
  },
};
