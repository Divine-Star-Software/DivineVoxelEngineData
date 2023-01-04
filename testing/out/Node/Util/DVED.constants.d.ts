export declare const SecotrData: {
    byteSize: number;
    maxSectors: number;
    getSectorsNeeded(byteLength: number): number;
    getTotalSectorsInFile(byteLength: number): number;
    getSectorByteIndex(index: number): number;
    getTotalBytesNeeded(byteLength: number): number;
};
export declare const RegionHeaderData: {
    byteSize: number;
};
export declare const RegionTagIds: {
    sectorIndex: string;
    columnLength: string;
    timeStamp: string;
};
