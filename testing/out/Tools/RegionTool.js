export class RegionTool {
    location = ["main", 0, 0, 0];
    dimension = "";
    previousDimension = "";
    path = "";
    fileName = "";
    dataType = "world-data";
    setDataType(dataTypes) {
        this.dataType = dataTypes;
        this._setFileName();
        return this;
    }
    setLocation(location) {
        this.location = location;
        this.dimension = location[0];
        return this;
    }
    getCurrentPath() {
        return this._getDataPath(this.dataType, this.fileName);
    }
    _getSwapPath() {
        return this._getDataPath(this.dataType, "swap-" + this.fileName);
    }
    _dimensionPath(dataPath = "") {
        return `${this.path}/${this.dimension}/${dataPath}`;
    }
    _getDataPath(dataType, fileName = "") {
        return this._dimensionPath(`${dataType}/${fileName}`);
    }
    _setFileName() { }
    regionExists() {
        return false;
    }
    createRegion() { }
    regionHasColumn() {
        const timeStamp = this.getColumnTimestamp();
        return timeStamp > 0;
    }
    getAllColumns() { }
    copyToNewfile() { }
    getColumnTimestamp() {
        return 0;
    }
    getSectorIndex() { }
    getColumnDataLength() { }
    getHeader() { }
    loadColumn() { }
    saveColumn(buffer) { }
}
