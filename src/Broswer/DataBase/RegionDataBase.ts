import type { DataBase } from "zeneithdb";
import type { DVEDDataTypes } from "../../Types/DVED.types";

export const RegionDataBase = {
  database: <DataBase>{},
  regionHeader: {
    async set(key: string, type: DVEDDataTypes, data: ArrayBuffer) {
      await RegionDataBase.database.setData(
        type,
        this._getKey(key, type),
        new Blob([data])
      );
    },
    async get(key: string, type: DVEDDataTypes): Promise<ArrayBuffer | false> {
      const blob = await RegionDataBase.database.getData<Blob>(
        type,
        this._getKey(key, type)
      );

      if (!blob) return false;
      return await blob.arrayBuffer();
    },
    _getKey(key: string, type: DVEDDataTypes) {
      return `${key}_${type}_region_header`;
    },
  },
  column: {
    async set(key: string, type: DVEDDataTypes, data: ArrayBuffer) {
      await RegionDataBase.database.setData(
        type,
        this._getKey(key, type),
        new Blob([data])
      );
    },
    async get(key: string, type: DVEDDataTypes) {
      const blob = await RegionDataBase.database.getData<Blob>(
        type,
        this._getKey(key, type)
      );

      if (!blob) return false;
      return await blob.arrayBuffer();
    },
    _getKey(key: string, type: DVEDDataTypes) {
      return `${key}_${type}_column`;
    },
  },
  columnTimestamp: {
    async set(key: string, type: DVEDDataTypes, timeStamp: number) {
      await RegionDataBase.database.setData(
        type,
        this._getKey(key, type),
        timeStamp
      );
    },
    async get(key: string, type: DVEDDataTypes) {
      const timeStamp = await RegionDataBase.database.getData<Blob>(
        type,
        this._getKey(key, type)
      );

      if (!timeStamp) return false;
      return Number(timeStamp);
    },
    _getKey(key: string, type: DVEDDataTypes) {
      return `${key}_${type}_column_timestamp`;
    },
  },
};
