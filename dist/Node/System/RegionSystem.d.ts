import type { DVEDFile, DVEDLocationData } from "Types/DVED.types";
export declare const RegionSystem: {
    _processInput(buffer: ArrayBuffer | string): ArrayBufferLike;
    _getTagIndex(id: string, index: number): number;
    _getIndex(index: number | DVEDLocationData): number;
    timeStamp: {
        get(file: DVEDFile, index: number): number | false;
        set(file: DVEDFile, index: number, timeStamp?: number): void;
    };
    sectorIndex: {
        get(file: DVEDFile, index: number): number | false;
        set(file: DVEDFile, index: number, length: number): void;
    };
    columnLength: {
        get(file: DVEDFile, index: number): number | false;
        set(file: DVEDFile, index: number, length: number): boolean;
    };
    sectors: {
        get(file: DVEDFile, sectorIndex: number, length: number): false | ArrayBuffer;
        set(file: DVEDFile, sectorIndex: number, data: ArrayBuffer): void;
    };
    getHeader(file: DVEDFile): false | ArrayBuffer;
    _rebuild(file: DVEDFile, swapFile: DVEDFile, newColumnIndex: number, newColumnData: ArrayBuffer): void;
    _getAllColumns(file: DVEDFile): IterableIterator<[number, ArrayBuffer]>;
    loadColumn(file: DVEDFile, index: number | DVEDLocationData): false | ArrayBuffer;
    saveColumn(file: DVEDFile, index: number | DVEDLocationData, data: ArrayBuffer | string): void;
};
