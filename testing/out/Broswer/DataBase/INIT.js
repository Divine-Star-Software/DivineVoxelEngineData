import { ZeneithDB } from "zeneithdb";
export async function $INIT_REGION_DATABASE(db) {
    await ZeneithDB.$INIT();
}
