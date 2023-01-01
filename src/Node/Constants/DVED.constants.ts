export const SecotrData = {
  byteSize: 0,
  maxSectors: 16,

  getSectorsNeeded(byteLength: number) {
    return Math.ceil(byteLength / SecotrData.byteSize);
  },
  getTotalSectorsInFile(byteLength: number) {
    return Math.ceil(
      Math.abs(byteLength - RegionHeaderData.byteSize) / SecotrData.byteSize
    );
  },
  getSectorByteStart(index: number) {
    return (index ) * this.byteSize + RegionHeaderData.byteSize;
  },
};

export const RegionHeaderData = {
  byteSize: 0,
};
