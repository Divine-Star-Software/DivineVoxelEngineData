import type { LocationData } from "Node/Libs/voxelSpaces/Types/VoxelSpaces.types";
import { DVEDDataTypes } from "Types/DVED.types";
export declare class RegionTool {
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
    createRegion(): void;
    regionHasColumn(): boolean;
    getAllColumns(): void;
    copyToNewfile(): void;
    getColumnTimestamp(): number;
    getSectorIndex(): void;
    getColumnDataLength(): void;
    getHeader(): void;
    loadColumn(): void;
    saveColumn(buffer: ArrayBuffer | string): void;
}
