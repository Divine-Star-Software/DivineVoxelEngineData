import type { DataBase } from "zeneithdb";
import type { DVEDDataTypes } from "../../Types/DVED.types";
export declare const WorldDataBase: {
    database: DataBase;
    create(): void;
    regionHeader: {
        set(key: string, type: DVEDDataTypes, data: ArrayBuffer): Promise<void>;
        get(key: string, type: DVEDDataTypes): Promise<ArrayBuffer | false>;
        _getKey(key: string, type: DVEDDataTypes): string;
    };
    column: {
        set(key: string, type: DVEDDataTypes, data: ArrayBuffer): Promise<void>;
        get(key: string, type: DVEDDataTypes): Promise<false | ArrayBuffer>;
        _getKey(key: string, type: DVEDDataTypes): string;
    };
    columnTimestamp: {
        set(key: string, type: DVEDDataTypes, timeStamp: number): Promise<void>;
        get(key: string, type: DVEDDataTypes): Promise<number | false>;
        _getKey(key: string, type: DVEDDataTypes): string;
    };
};
