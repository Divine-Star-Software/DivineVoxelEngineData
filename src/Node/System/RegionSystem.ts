import type { DVEDFile, DVEDLocationData } from "Types/DVED.types";
import { RegionData, RegionTagIds, SecotrData } from "../Util/DVED.util.js";
import { DVED } from "../DivineVoxelEngineData.js";
import { System } from "./System.js";
import { SystemPath } from "./SystemPath.js";

export const RegionSystem = {
  _processInput(buffer: ArrayBuffer | string) {
    if (buffer instanceof ArrayBuffer) return buffer;
    if (ArrayBuffer.isView(buffer)) return buffer.buffer;
    let newBuf = new ArrayBuffer(buffer.length);
    const array = new Uint8Array(newBuf);
    let i = newBuf.byteLength;
    while (i--) {
      array[i] = buffer.charCodeAt(i);
    }
    return newBuf;
  },

  _getTagIndex(id: string, index: number) {
    return DVED.regionTags.getArrayTagByteIndex(id, index);
  },

  _getIndex(index: number | DVEDLocationData) {
    if (Array.isArray(index)) {
      index = DVED.spaces.column.getIndexXYZ(index[1], index[2], index[3]);
    }
    return index;
  },

  timeStamp: {
    get(file: DVEDFile, index: number) {
      const timeStampData = file.read(
        RegionSystem._getTagIndex(RegionTagIds.timeStamp, index),
        4
      );
      if (!timeStampData) return false;
      return new Uint32Array(timeStampData)[0];
    },
    set(file: DVEDFile, index: number, timeStamp = Date.now()) {
      file.write(
        RegionSystem._getTagIndex(RegionTagIds.timeStamp, index),
        new Uint32Array([timeStamp]).buffer
      );
    },
  },
  sectorIndex: {
    get(file: DVEDFile, index: number) {
      const sectorIndexData = file.read(
        RegionSystem._getTagIndex(RegionTagIds.sectorIndex, index),
        2
      );
      if (!sectorIndexData) return false;
      return new Uint16Array(sectorIndexData)[0];
    },
    set(file: DVEDFile, index: number, length: number) {
      file.write(
        RegionSystem._getTagIndex(RegionTagIds.sectorIndex, index),
        new Uint16Array([length]).buffer
      );
    },
  },
  columnLength: {
    get(file: DVEDFile, index: number) {
      const columnLengthData = file.read(
        RegionSystem._getTagIndex(RegionTagIds.columnLength, index),
        2
      );
      if (!columnLengthData) return false;
      return new Uint16Array(columnLengthData)[0];
    },
    set(file: DVEDFile, index: number, length: number) {
      return file.write(
        RegionSystem._getTagIndex(RegionTagIds.columnLength, index),
        new Uint16Array([length]).buffer
      );
    },
  },
  sectors: {
    get(file: DVEDFile, sectorIndex: number, length: number) {
      return file.read(SecotrData.getSectorByteIndex(sectorIndex), length);
    },
    set(file: DVEDFile, sectorIndex: number, data: ArrayBuffer) {
      const sectorByteIndex = SecotrData.getSectorByteIndex(sectorIndex);
      file.clear(
        sectorByteIndex,
        SecotrData.getTotalBytesNeeded(data.byteLength)
      );
      file.write(sectorByteIndex, data);
    },
  },

  getHeader(file: DVEDFile) {
    return file.read(0, RegionData.headByteSize);
  },

  _rebuild(
    file: DVEDFile,
    swapFile: DVEDFile,
    newColumnIndex: number,
    newColumnData: ArrayBuffer
  ) {
    const columns = this._getAllColumns(file);
    for (const column of columns) {
      let [index, data] = column;
      if (index == newColumnIndex) data = newColumnData;
      this.saveColumn(swapFile, index, data);
    }
  },

  _getAllColumns(file: DVEDFile) {
    return (function* generator(): IterableIterator<[number, ArrayBuffer]> {
      for (let i = 0; i < RegionData.numColumns; i++) {
        let data = RegionSystem.loadColumn(file, i);
        data = data ? data : new ArrayBuffer(0);
        yield [i, data];
      }
    })();
  },

  loadColumn(file: DVEDFile, index: number | DVEDLocationData) {
    index = this._getIndex(index);
    const sectorIndex = this.sectorIndex.get(file, index);
    if (!sectorIndex) return false;
    const columnLength = this.columnLength.get(file, index);
    if (!columnLength) return false;
    return this.sectors.get(file, sectorIndex, columnLength);
  },

  saveColumn(
    file: DVEDFile,
    index: number | DVEDLocationData,
    data: ArrayBuffer | string
  ) {
    index = this._getIndex(index);
    data = this._processInput(data);
    const currentFileSize = file.getSize();
    let sectorIndex = this.sectorIndex.get(file, index);
    if (!sectorIndex) {
      sectorIndex = SecotrData.getTotalSectorsInFile(currentFileSize);
      this.sectorIndex.set(file, index, sectorIndex);
    }
    let currentColumnLegnth = this.columnLength.get(file, index);
    if (currentColumnLegnth) {
      const currentSectors = SecotrData.getSectorsNeeded(currentColumnLegnth);
      const newSectors = SecotrData.getSectorsNeeded(data.byteLength);
      if (currentSectors < newSectors) {
        const swapFilePath = SystemPath.getDataPath(Date.now() + "-temp.dved");
        const swapFile = System.createAndOpenFile(
          swapFilePath,
          RegionData.headByteSize
        );

        if (swapFile) {
          this._rebuild(file, swapFile, index, data);
          swapFile.move(file.getPath());
          swapFile.close();
          file.reOpen();
          const deleteSwap = System.openFile(swapFilePath);
          if (deleteSwap) {
            deleteSwap.delete();
            deleteSwap.close();
          }
        }
      }
    }

    this.sectors.set(file, sectorIndex, data);
    this.columnLength.set(file, index, data.byteLength);
    this.timeStamp.set(file, index);
  },
};
