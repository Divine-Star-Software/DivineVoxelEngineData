import { ZeneithDB } from "zeneithdb";
export async function $INIT_REGION_DATABASE(db) {
    await ZeneithDB.$INIT();
    const dbName = "dved";
    const existanceCheck = await ZeneithDB.databaseExists(dbName);
    if (!existanceCheck) {
        db.database = await ZeneithDB.createDatabase({
            databaseName: dbName,
            collections: [
                {
                    name: "world-data",
                    schema: [],
                },
                {
                    name: "rich-data",
                    schema: [],
                },
                {
                    name: "entities",
                    schema: [],
                },
                {
                    name: "dbo",
                    schema: [],
                },
            ],
        });
    }
    else {
        db.database = await ZeneithDB.getDatabase(dbName);
    }
    await db.database.open();
}
