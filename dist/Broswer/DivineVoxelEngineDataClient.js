import { $INIT_REGION_DATABASE } from "./DataBase/INIT.js";
import { RegionDataBase } from "./DataBase/RegionDataBase.js";
export const DVEDBrowser = {
    async $INIT() {
        await $INIT_REGION_DATABASE(RegionDataBase);
        return RegionDataBase;
    },
};
