import type { ZeneithDatabaseCreationData } from "../Meta/Database/Database.types";
import type { ZeneithSchema } from "../Meta/Database/Schema.types";
export declare class DataBase {
    creationData: ZeneithDatabaseCreationData;
    outsideZeneith: boolean;
    dataBaseName: string;
    util: {
        getUUID: () => string;
    };
    opened: boolean;
    db: IDBDatabase | null;
    constructor(creationData: ZeneithDatabaseCreationData, outsideZeneith?: boolean);
    isOpen(): boolean;
    getUUID(): string;
    open(): Promise<boolean> | true;
    close(): boolean;
    _openAtVersion(version?: number): Promise<boolean>;
    $create(): Promise<boolean>;
    forceUpdate(): Promise<boolean>;
    _processCollectionScehma(collection: IDBObjectStore, schema: ZeneithSchema): void;
    __traverseColletionScehma(collection: IDBObjectStore, schema: ZeneithSchema): void;
    getDatabaeVersion(): Promise<number>;
    doesCollectionExists(collectionName: string): boolean;
    getData<T>(collectionName: string, key: string): Promise<T | false>;
    getAllData<T>(collectionName: string): Promise<T[] | false>;
    getAllKeys(collectionName: string): Promise<IDBValidKey[] | false>;
    removeData(collectionName: string, key: string): Promise<boolean>;
    removeAllData(collectionName: string): Promise<boolean>;
    setData<T>(collectionName: string, key: string, setData: T): Promise<boolean>;
    updateData<T>(collectionName: string, key: string, updateFunction: (data: T) => T): Promise<boolean>;
}
