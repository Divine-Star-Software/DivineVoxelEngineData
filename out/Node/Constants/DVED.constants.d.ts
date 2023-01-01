export declare const SecotrData: {
    byteSize: number;
    maxSectors: number;
    getSectorsNeeded(byteLength: number): number;
    getTotalSectorsInFile(byteLength: number): number;
    getSectorByteStart(index: number): number;
};
export declare const RegionHeaderData: {
    byteSize: number;
};
