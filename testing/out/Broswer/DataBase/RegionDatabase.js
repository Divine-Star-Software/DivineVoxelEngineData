export const WorldDataBase = {
    database: {},
    create() {
    },
    regionHeader: {
        async set(key, type, data) {
            await WorldDataBase.database.setData(type, this._getKey(key, type), new Blob([data]));
        },
        async get(key, type) {
            const blob = await WorldDataBase.database.getData(type, this._getKey(key, type));
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
            await WorldDataBase.database.setData(type, this._getKey(key, type), new Blob([data]));
        },
        async get(key, type) {
            const blob = await WorldDataBase.database.getData(type, this._getKey(key, type));
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
            await WorldDataBase.database.setData(type, this._getKey(key, type), timeStamp);
        },
        async get(key, type) {
            const timeStamp = await WorldDataBase.database.getData(type, this._getKey(key, type));
            if (!timeStamp)
                return false;
            return Number(timeStamp);
        },
        _getKey(key, type) {
            return `${key}_${type}_column_timestamp`;
        },
    },
};
