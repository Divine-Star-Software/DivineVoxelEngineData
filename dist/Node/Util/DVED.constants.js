export const SecotrData = {
    byteSize: 0,
    maxSectors: 16,
    getSectorsNeeded(byteLength) {
        return Math.ceil(byteLength / SecotrData.byteSize);
    },
    getTotalSectorsInFile(byteLength) {
        return Math.ceil(Math.abs(byteLength - RegionHeaderData.byteSize) / SecotrData.byteSize);
    },
    getSectorByteIndex(index) {
        return index * this.byteSize + RegionHeaderData.byteSize;
    },
    getTotalBytesNeeded(byteLength) {
        return this.getSectorsNeeded(byteLength) * this.byteSize;
    },
};
export const RegionHeaderData = {
    byteSize: 0,
};
export const RegionTagIds = {
    sectorIndex: "#dved-column-sector-index",
    columnLength: "#dved-column-legnth-index",
    timeStamp: "#dved-column-save-timestamp",
};
