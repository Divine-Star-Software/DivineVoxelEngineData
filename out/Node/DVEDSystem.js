import { RegionHeaderData, SecotrData } from "./Constants/DVED.constants.js";
export const DVEDSystem = {
    fs: {},
    setFS(fs) {
        this.fs = fs;
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
    createFile(path, data) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(path, new Uint8Array(data), { encoding: "utf-8" }, (data) => {
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
            this.fs.open(path, "r+", (err, fd) => {
                if (!err) {
                    this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, (err, bytesWritten, buffer) => {
                        if (!err) {
                            // succesfully wrote byte to offset
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
            });
        });
    },
    readAtByteIndex(path, start, length) {
        return new Promise((resolve, reject) => {
            this.fs.open(path, "r", (err, fd) => {
                if (!err) {
                    const storeBuffer = Buffer.alloc(length);
                    this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
                        if (!err) {
                            resolve(new Uint8Array(storeBuffer));
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
            });
        });
    },
    clearSector(path, start) {
        const data = Buffer.alloc(SecotrData.byteSize);
        return new Promise((resolve, reject) => {
            this.fs.open(path, "r+", (err, fd) => {
                if (!err) {
                    this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, (err) => {
                        if (!err) {
                            // succesfully wrote byte to offset
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
            });
        });
    },
    writeToSector(path, start, data) {
        return new Promise(async (resolve, reject) => {
            await this.clearSector(path, start);
            this.fs.open(path, "r+", (err, fd) => {
                if (!err) {
                    this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, (err) => {
                        if (!err) {
                            // succesfully wrote byte to offset
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
            });
        });
    },
    readSectors(path, start, length) {
        return new Promise((resolve, reject) => {
            this.fs.open(path, "r", (err, fd) => {
                if (!err) {
                    const storeBuffer = Buffer.alloc(length);
                    this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
                        if (!err) {
                            resolve(new Uint8Array(storeBuffer));
                        }
                        else {
                            resolve(false);
                        }
                    });
                }
            });
        });
    },
};
