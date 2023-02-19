import type { DVEDDataTypes } from "../../Types/DVED.types";
import type { LocationData } from "voxelspaces";
export declare class NodeRegionTool {
    location: LocationData;
    dimension: string;
    previousDimension: string;
    path: string;
    fileName: string;
    dataType: DVEDDataTypes;
    setDataType(dataTypes: DVEDDataTypes): this;
    setLocation(location: LocationData): this;
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
    getSectorIndex(): number | false;
    getColumnDataLength(): number | false;
    getHeader(): false | ArrayBuffer;
    loadColumn(): false | ArrayBuffer;
    saveColumn(buffer: ArrayBuffer | string): boolean;
}
