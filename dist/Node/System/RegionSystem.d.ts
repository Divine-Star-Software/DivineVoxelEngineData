import type { DVEDSyncFile } from "../../Types/DVED.types";
import type { LocationData } from "voxelspaces";
export declare const RegionSystem: {
    _processInput(buffer: ArrayBuffer | string): ArrayBufferLike;
    _getTagIndex(id: string, index: number): number;
    _getIndex(index: number | LocationData): number;
    timeStamp: {
        get(file: DVEDSyncFile, index: number): number | false;
        set(file: DVEDSyncFile, index: number, timeStamp?: number): boolean;
    };
    sectorIndex: {
        get(file: DVEDSyncFile, index: number): number | false;
        set(file: DVEDSyncFile, index: number, sectorIndex: number): boolean;
    };
    columnLength: {
        get(file: DVEDSyncFile, index: number): number | false;
        set(file: DVEDSyncFile, index: number, length: number): boolean;
    };
    sectors: {
        get(file: DVEDSyncFile, sectorIndex: number, length: number): false | ArrayBuffer;
        set(file: DVEDSyncFile, sectorIndex: number, data: ArrayBuffer): boolean;
    };
    getHeader(file: DVEDSyncFile): false | ArrayBuffer;
    _rebuild(file: DVEDSyncFile, swapFile: DVEDSyncFile, newColumnIndex: number, newColumnData: ArrayBuffer): void;
    _getAllColumns(file: DVEDSyncFile): IterableIterator<[number, ArrayBuffer]>;
    loadColumn(file: DVEDSyncFile, index: number | LocationData): false | ArrayBuffer;
    saveColumn(file: DVEDSyncFile, index: number | LocationData, data: ArrayBuffer | string): void;
};
