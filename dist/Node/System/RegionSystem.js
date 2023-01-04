import { RegionData, RegionTagIds, SecotrData } from "../Util/DVED.util.js";
import { DVED } from "../DivineVoxelEngineData.js";
import { System } from "./System.js";
import { SystemPath } from "./SystemPath.js";
export const RegionSystem = {
    _processInput(buffer) {
        if (buffer instanceof ArrayBuffer)
            return buffer;
        if (ArrayBuffer.isView(buffer))
            return buffer.buffer;
        let newBuf = new ArrayBuffer(buffer.length);
        const array = new Uint8Array(newBuf);
        let i = newBuf.byteLength;
        while (i--) {
            array[i] = buffer.charCodeAt(i);
        }
        return newBuf;
    },
    _getTagIndex(id, index) {
        return DVED.regionTags.getArrayTagByteIndex(id, index);
    },
    _getIndex(index) {
        if (Array.isArray(index)) {
            index = DVED.spaces.column.getIndexXYZ(index[1], index[2], index[3]);
        }
        return index;
    },
    timeStamp: {
        get(file, index) {
            const timeStampData = file.read(RegionSystem._getTagIndex(RegionTagIds.timeStamp, index), 4);
            if (!timeStampData)
                return false;
            return new Uint32Array(timeStampData)[0];
        },
        set(file, index, timeStamp = Date.now()) {
            file.write(RegionSystem._getTagIndex(RegionTagIds.timeStamp, index), new Uint32Array([timeStamp]).buffer);
        },
    },
    sectorIndex: {
        get(file, index) {
            const sectorIndexData = file.read(RegionSystem._getTagIndex(RegionTagIds.sectorIndex, index), 2);
            if (!sectorIndexData)
                return false;
            return new Uint16Array(sectorIndexData)[0];
        },
        set(file, index, length) {
            file.write(RegionSystem._getTagIndex(RegionTagIds.sectorIndex, index), new Uint16Array([length]).buffer);
        },
    },
    columnLength: {
        get(file, index) {
            const columnLengthData = file.read(RegionSystem._getTagIndex(RegionTagIds.columnLength, index), 2);
            if (!columnLengthData)
                return false;
            return new Uint16Array(columnLengthData)[0];
        },
        set(file, index, length) {
            return file.write(RegionSystem._getTagIndex(RegionTagIds.columnLength, index), new Uint16Array([length]).buffer);
        },
    },
    sectors: {
        get(file, sectorIndex, length) {
            return file.read(SecotrData.getSectorByteIndex(sectorIndex), length);
        },
        set(file, sectorIndex, data) {
            const sectorByteIndex = SecotrData.getSectorByteIndex(sectorIndex);
            file.clear(sectorByteIndex, SecotrData.getTotalBytesNeeded(data.byteLength));
            file.write(sectorByteIndex, data);
        },
    },
    getHeader(file) {
        return file.read(0, RegionData.headByteSize);
    },
    _rebuild(file, swapFile, newColumnIndex, newColumnData) {
        const columns = this._getAllColumns(file);
        for (const column of columns) {
            let [index, data] = column;
            if (index == newColumnIndex)
                data = newColumnData;
            this.saveColumn(swapFile, index, data);
        }
    },
    _getAllColumns(file) {
        return (function* generator() {
            for (let i = 0; i < RegionData.numColumns; i++) {
                let data = RegionSystem.loadColumn(file, i);
                data = data ? data : new ArrayBuffer(0);
                yield [i, data];
            }
        })();
    },
    loadColumn(file, index) {
        index = this._getIndex(index);
        const sectorIndex = this.sectorIndex.get(file, index);
        if (!sectorIndex)
            return false;
        const columnLength = this.columnLength.get(file, index);
        if (!columnLength)
            return false;
        return this.sectors.get(file, sectorIndex, columnLength);
    },
    saveColumn(file, index, data) {
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
                const swapFile = System.createAndOpenFile(swapFilePath, RegionData.headByteSize);
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
