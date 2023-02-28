export const WorldDataBase = {
    database: {},
    dimension: "",
    typeStores: {},
    async setDimension(id) {
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
            this.typeStores["world-data"] = await this.database.getCollection(worldDataId);
            this.typeStores["rich-data"] = await this.database.getCollection(richDataId);
            this.typeStores["entities"] = await this.database.getCollection(entitiesId);
            this.typeStores["dbo"] = await this.database.getCollection(dboId);
        }
        this.dimension = id;
    },
    regionHeader: {
        async set(key, type, data) {
            await WorldDataBase.typeStores[type].set(this._getKey(key, type), new Blob([data]));
        },
        async get(key, type) {
            const blob = (await WorldDataBase.typeStores[type].get(this._getKey(key, type)));
            if (!blob)
                return false;
            return await blob.arrayBuffer();
        },
        _getKey(key, type) {
            return `${key}_${type}_region_header`;
        },
    },
    column: {
        async set(key, type, data) {
            await WorldDataBase.typeStores[type].set(this._getKey(key, type), new Blob([data]));
        },
        async get(key, type) {
            const blob = (await WorldDataBase.typeStores[type].get(this._getKey(key, type)));
            if (!blob)
                return false;
            return await blob.arrayBuffer();
        },
        _getKey(key, type) {
            return `${key}_${type}_column`;
        },
    },
    columnTimestamp: {
        async set(key, type, timeStamp) {
            await WorldDataBase.typeStores[type].set(this._getKey(key, type), timeStamp);
        },
        async get(key, type) {
            const timeStamp = (await WorldDataBase.typeStores[type].get(this._getKey(key, type)));
            if (!timeStamp)
                return false;
            return Number(timeStamp);
        },
        _getKey(key, type) {
            return `${key}_${type}_column_timestamp`;
        },
    },
};
