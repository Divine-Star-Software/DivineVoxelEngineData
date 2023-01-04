import * as path from "path";
export const SystemPath = {
    _dataPath: "",
    _dataFolder: "dved",
    getDataPath(fileName) {
        return path.join(`${this._dataPath}/${this._dataFolder}`, fileName);
    },
    $INIT() {
        this._dataPath =
            process.env.APPDATA ||
                (process.platform == "darwin"
                    ? process.env.HOME + "/Library/Preferences"
                    : process.env.HOME + "/.local/share");
    },
};
