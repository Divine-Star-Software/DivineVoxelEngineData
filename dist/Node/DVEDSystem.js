import { RegionHeaderData, SecotrData } from "./Constants/DVED.constants.js";
export const DVEDSystem = {
    fs: {},
    setFS(fs) {
        this.fs = fs;
    },
    mkdirs(paths) {
        for (const path of paths) {
            if (!this.fs.existsSync(path)) {
                this.fs.mkdirSync(path);
            }
        }
    },
    fileExists(path) {
        return new Promise((resolve, reject) => {
            this.fs.stat(path, (error, stats) => {
                if (error || stats.size < RegionHeaderData.byteSize) {
                    resolve(0);
                    return;
                }
                resolve(stats.size);
            });
        });
    },
    fileExistsSync(path) {
        try {
            const stat = this.fs.statSync(path);
            return stat.size;
        }
        catch (error) {
            return 0;
        }
    },
    createFileSync(path, data) {
        try {
            this.fs.writeFileSync(path, new Uint8Array(data));
            return true;
        }
        catch (error) {
            return false;
        }
    },
    createFile(path, data) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(path, new Uint8Array(data), {}, (data) => {
                if (data?.errno != 0) {
                    resolve(false);
                }
            });
        });
    },
    stringToUint8Array(string) {
        const array = new Uint8Array(string.length);
        for (let i = 0; array.length; i++) {
            array[i] = string[i].charCodeAt(0);
        }
    },
    writeAtByteIndex(path, start, data) {
        return new Promise((resolve, reject) => {
            try {
                this.fs.open(path, "r+", (err, fd) => {
                    if (!err) {
                        this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, (err, bytesWritten, buffer) => {
                            if (!err) {
                                // succesfully wrote byte to offset
                                this.fs.close(fd, () => {
                                    resolve(true);
                                });
                            }
                            else {
                                resolve(false);
                            }
                        });
                        return;
                    }
                    console.error(err);
                    resolve(false);
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    readAtByteIndex(path, start, length) {
        return new Promise((resolve, reject) => {
            try {
                this.fs.open(path, "r", (err, fd) => {
                    if (!err) {
                        const storeBuffer = Buffer.alloc(length);
                        this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
                            if (!err) {
                                this.fs.close(fd, () => {
                                    resolve(new Uint8Array(storeBuffer));
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                            }
                        });
                        return;
                    }
                    console.error(err);
                    resolve(false);
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    clearSector(path, start, sectors = 1) {
        const data = Buffer.alloc(SecotrData.byteSize);
        return new Promise((resolve, reject) => {
            try {
                this.fs.open(path, "r+", (err, fd) => {
                    if (!err) {
                        this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, (err) => {
                            if (!err) {
                                // succesfully wrote byte to offset
                                this.fs.close(fd, () => {
                                    resolve(true);
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                            }
                        });
                        return;
                    }
                    console.error(err);
                    resolve(false);
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    writeToSector(path, start, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.clearSector(path, start, SecotrData.getSectorsNeeded(data.byteLength));
                this.fs.open(path, "r+", (err, fd) => {
                    if (!err) {
                        this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, (err) => {
                            if (!err) {
                                this.fs.close(fd, () => {
                                    resolve(true);
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                            }
                        });
                    }
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    readSectors(path, start, length) {
        return new Promise((resolve, reject) => {
            try {
                this.fs.open(path, "r", (err, fd) => {
                    if (err) {
                        console.error(err);
                        resolve(false);
                        return;
                    }
                    if (!err) {
                        const storeBuffer = new Uint8Array(length);
                        this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
                            if (!err) {
                                this.fs.close(fd, () => {
                                    resolve(storeBuffer);
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                                return;
                            }
                        });
                    }
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
};
