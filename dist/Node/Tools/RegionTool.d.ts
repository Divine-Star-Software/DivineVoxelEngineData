import type { DVEDDataTypes, DVEDLocationData } from "../../Types/DVED.types";
export declare class RegionTool {
    location: DVEDLocationData;
    dimension: string;
    previousDimension: string;
    path: string;
    fileName: string;
    dataType: DVEDDataTypes;
    setPath(path: string): this;
    setDataType(dataTypes: DVEDDataTypes): this;
    setLocation(location: DVEDLocationData): this;
    getCurrentPath(): string;
    _getSwapPath(): string;
    _dimensionPath(dataPath?: string): string;
    _getDataPath(dataType: DVEDDataTypes, fileName?: string): string;
    _setFileName(): void;
    regionExists(): boolean;
    createRegion(): boolean;
    regionHasColumn(): boolean;
    getAllColumns(): false | IterableIterator<[number, ArrayBuffer]>;
    copyToNewfile(): void;
    getColumnTimestamp(): number | false;
    getHeader(): false | ArrayBuffer;
    loadColumn(): false | ArrayBuffer;
    saveColumn(buffer: ArrayBuffer | string): boolean;
}
