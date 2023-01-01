import type { DVEDLocationData } from "Types/DVED.types";
import { DVEDSystem } from "../DVEDSystem.js";
import { DVED } from "../DivineVoxelEngineData.js";
import { SecotrData } from "../Constants/DVED.constants.js";

const getTagIndex = (id: string, location: DVEDLocationData) => {
  const columnIndex = DVED.spaces.column.getIndexXYZ(
    location[1],
    location[2],
    location[3]
  );
  return DVED.tags.getArrayTagByteIndex(id, columnIndex);
};

export class RegionTool {
  location: DVEDLocationData = ["main", 0, 0, 0];
  path = "";
  fileName = "";

  setPath(path: string) {
    this.path = path;
  }

  setLocation(location: DVEDLocationData) {
    this.location = location;
    this.fileName = `region_${location[0]}_${location[1]}_${location[2]}_${location[3]}.dved`;
    return this;
  }

  _getFilePath() {
    return this.path + "/" + this.fileName;
  }

  async regionExists() {
    return await DVEDSystem.fileExists(this._getFilePath());
  }

  async createRegion(buffer = new ArrayBuffer(DVED.tags.tagSize)) {
    return await DVEDSystem.createFile(this._getFilePath(), buffer);
  }

  async regionHasColumn(location: DVEDLocationData) {
    return false;
  }

  async loadColumn(location: DVEDLocationData) {
    const path = this._getFilePath();
    const columnSectorIndex = getTagIndex(
      "#dved-column-sector-index",
      location
    );
    const sectorIndexData = await DVEDSystem.readAtByteIndex(
      path,
      columnSectorIndex,
      2
    );
    let sectorIndex = 0;
    if (!sectorIndexData) {
      return false;
    } else {
      sectorIndex = new Uint16Array(sectorIndexData.buffer)[0];
    }
    const columnLengthIndex = getTagIndex(
      "#dved-column-legnth-index",
      location
    );
    const columnLengthData = await DVEDSystem.readAtByteIndex(
      path,
      columnLengthIndex,
      2
    );
    let columnLength = 0;
    if (!columnLengthData) {
      return false;
    } else {
      columnLength = new Uint16Array(columnLengthData.buffer)[0];
    }

    return await DVEDSystem.readSectors(
      path,
      SecotrData.getSectorByteStart(sectorIndex),
      columnLength
    );
  }

  async saveColumn(location: DVEDLocationData, buffer: ArrayBuffer) {
    const path = this._getFilePath();
    const currentSize = await DVEDSystem.fileExists(path);

    const columnSectorIndex = getTagIndex(
      "#dved-column-sector-index",
      location
    );
    const sectorIndexData = await DVEDSystem.readAtByteIndex(
      path,
      columnSectorIndex,
      2
    );
    let sectorIndex = 0;
    if (!sectorIndexData) {
    } else {
      sectorIndex = new Uint16Array(sectorIndexData.buffer)[0];
    }
    if (!sectorIndex) {
      sectorIndex = SecotrData.getTotalSectorsInFile(currentSize);
      await DVEDSystem.writeAtByteIndex(
        path,
        columnSectorIndex,
        new Uint16Array([sectorIndex]).buffer
      );
    }

    await DVEDSystem.writeToSector(
      path,
      SecotrData.getSectorByteStart(sectorIndex),
      buffer
    );
    const columnLengthIndex = getTagIndex(
      "#dved-column-legnth-index",
      location
    );

    await DVEDSystem.writeAtByteIndex(
      path,
      columnLengthIndex,
      new Uint16Array([buffer.byteLength]).buffer
    );
  }
}
