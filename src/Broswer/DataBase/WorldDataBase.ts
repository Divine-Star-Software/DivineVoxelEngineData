import type { DataBase, ObjectStore } from "zeneithdb";
import type { DVEDDataTypes } from "../../Types/DVED.types";

export const WorldDataBase = {
  database: <DataBase>{},
  dimension: "",
  typeStores: <Record<DVEDDataTypes, ObjectStore<any>>>{},

  async setDimension(id: string) {
    if (this.dimension != id) {
      const worldDataId = `${id}-world-data`;
      const richDataId = `${id}-rich-data`;
      const entitiesId = `${id}-entities`;
      const dboId = `${id}-dbo`;
      await this.database.addCollection([
        {
          name: worldDataId,
          schema: [],
        },
        {
          name: richDataId,
          schema: [],
        },
        {
          name: entitiesId,
          schema: [],
        },
        {
          name: dboId,
          schema: [],
        },
      ]);
      this.typeStores["world-data"] = await this.database.getCollection(
        worldDataId
      );
      this.typeStores["rich-data"] = await this.database.getCollection(
        richDataId
      );
      this.typeStores["entities"] = await this.database.getCollection(
        entitiesId
      );
      this.typeStores["dbo"] = await this.database.getCollection(dboId);
    }
    this.dimension = id;
  },

  regionHeader: {
    async set(key: string, type: DVEDDataTypes, data: ArrayBuffer) {
      await WorldDataBase.typeStores[type].set(
        this._getKey(key, type),
        new Blob([data])
      );
    },
    async get(key: string, type: DVEDDataTypes): Promise<ArrayBuffer | false> {
      const blob = <Blob>(
        await WorldDataBase.typeStores[type].get(this._getKey(key, type))
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
      await WorldDataBase.typeStores[type].set(
        this._getKey(key, type),
        new Blob([data])
      );
    },
    async get(key: string, type: DVEDDataTypes) {
      const blob = <Blob>(
        await WorldDataBase.typeStores[type].get(this._getKey(key, type))
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
      await WorldDataBase.typeStores[type].set(
        this._getKey(key, type),
        timeStamp
      );
    },
    async get(key: string, type: DVEDDataTypes) {
      const timeStamp = <number>(
        await WorldDataBase.typeStores[type].get(this._getKey(key, type))
      );

      if (!timeStamp) return false;
      return Number(timeStamp);
    },
    _getKey(key: string, type: DVEDDataTypes) {
      return `${key}_${type}_column_timestamp`;
    },
  },
};
