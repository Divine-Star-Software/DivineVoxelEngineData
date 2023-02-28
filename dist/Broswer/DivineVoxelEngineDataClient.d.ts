import { DataBase } from "zeneithdb";
export declare const DVEDBrowser: {
    $INIT(): Promise<void>;
    getWorldDataBase(dbName: string, dimension?: string): Promise<{
        database: DataBase;
        dimension: string;
        typeStores: Record<import("../index.js").DVEDDataTypes, import("zeneithdb").ObjectStore<any>>;
        setDimension(id: string): Promise<void>;
        regionHeader: {
            set(key: string, type: import("../index.js").DVEDDataTypes, data: ArrayBuffer): Promise<void>;
            get(key: string, type: import("../index.js").DVEDDataTypes): Promise<false | ArrayBuffer>;
            _getKey(key: string, type: import("../index.js").DVEDDataTypes): string;
        };
        column: {
            set(key: string, type: import("../index.js").DVEDDataTypes, data: ArrayBuffer): Promise<void>;
            get(key: string, type: import("../index.js").DVEDDataTypes): Promise<false | ArrayBuffer>;
            _getKey(key: string, type: import("../index.js").DVEDDataTypes): string;
        };
        columnTimestamp: {
            set(key: string, type: import("../index.js").DVEDDataTypes, timeStamp: number): Promise<void>;
            get(key: string, type: import("../index.js").DVEDDataTypes): Promise<number | false>;
            _getKey(key: string, type: import("../index.js").DVEDDataTypes): string;
        };
    }>;
    deleteWorldDataBase(dbName: string): Promise<void>;
};
