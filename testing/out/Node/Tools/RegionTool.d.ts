import type { DVEDLocationData } from "Types/DVED.types";
export declare class RegionTool {
    location: DVEDLocationData;
    path: string;
    fileName: string;
    setPath(path: string): void;
    setLocation(location: DVEDLocationData): this;
    _getFilePath(): string;
    regionExists(): Promise<number>;
    createRegion(buffer?: ArrayBuffer): Promise<unknown>;
    regionHasColumn(location: DVEDLocationData): Promise<boolean>;
    loadColumn(location: DVEDLocationData): Promise<false | Uint8Array>;
    saveColumn(location: DVEDLocationData, buffer: ArrayBuffer): Promise<void>;
}
