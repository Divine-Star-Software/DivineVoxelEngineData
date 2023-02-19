export declare const DVEDBrowser: {
    $INIT(): Promise<{
        database: import("zeneithdb").DataBase;
        regionHeader: {
            set(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes, data: ArrayBuffer): Promise<void>;
            get(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes): Promise<false | ArrayBuffer>;
            _getKey(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes): string;
        };
        column: {
            set(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes, data: ArrayBuffer): Promise<void>;
            get(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes): Promise<false | ArrayBuffer>;
            _getKey(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes): string;
        };
        columnTimestamp: {
            set(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes, timeStamp: number): Promise<void>;
            get(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes): Promise<number | false>;
            _getKey(key: string, type: import("../Types/DVED.types.js").DVEDDataTypes): string;
        };
    }>;
};
