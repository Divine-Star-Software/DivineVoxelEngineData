import type * as FileSystem from "fs";
import { RegionHeaderData, SecotrData } from "./Constants/DVED.constants.js";
export const DVEDSystem = {
  fs: <typeof FileSystem>{},

  setFS(fs: typeof FileSystem) {
    this.fs = fs;
  },

  fileExists(path: string): Promise<number> {
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

  createFile(path: string, data: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(
        path,
        new Uint8Array(data),
        { encoding: "utf-8" },
        (data) => {
          if (data?.errno != 0) {
            resolve(false);
          }
        }
      );
    });
  },

  stringToUint8Array(string: string) {
    const array = new Uint8Array(string.length);
    for (let i = 0; array.length; i++) {
      array[i] = string[i].charCodeAt(0);
    }
  },

  writeAtByteIndex(path: string, start: number, data: ArrayBuffer) {
    return new Promise((resolve, reject) => {
      this.fs.open(path, "r+", (err, fd) => {
        if (!err) {
          this.fs.write(
            fd,
            new Uint8Array(data),
            0,
            data.byteLength,
            start,
            (err, bytesWritten, buffer) => {
              if (!err) {
                // succesfully wrote byte to offset
                resolve(true);
              } else {
                resolve(false);
              }
            }
          );
        }
      });
    });
  },
  readAtByteIndex(
    path: string,
    start: number,
    length: number
  ): Promise<Uint8Array | false> {
    return new Promise((resolve, reject) => {
      this.fs.open(path, "r", (err, fd) => {
        if (!err) {
          const storeBuffer = Buffer.alloc(length);
          this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
            if (!err) {
              resolve(new Uint8Array(storeBuffer));
            } else {
              resolve(false);
            }
          });
        }
      });
    });
  },
  clearSector(path: string, start: number) {
    const data = Buffer.alloc(SecotrData.byteSize);
    return new Promise((resolve, reject) => {
      this.fs.open(path, "r+", (err, fd) => {
        if (!err) {
          this.fs.write(
            fd,
            new Uint8Array(data),
            0,
            data.byteLength,
            start,
            (err) => {
              if (!err) {
                // succesfully wrote byte to offset
                resolve(true);
              } else {
                resolve(false);
              }
            }
          );
        }
      });
    });
  },
  writeToSector(path: string, start: number, data: ArrayBuffer) {
    return new Promise(async (resolve, reject) => {
      await this.clearSector(path, start);
      this.fs.open(path, "r+", (err, fd) => {
        if (!err) {
          this.fs.write(
            fd,
            new Uint8Array(data),
            0,
            data.byteLength,
            start,
            (err) => {
              if (!err) {
                // succesfully wrote byte to offset
                resolve(true);
              } else {
                resolve(false);
              }
            }
          );
        }
      });
    });
  },
  readSectors(
    path: string,
    start: number,
    length: number
  ): Promise<Uint8Array | false> {
    return new Promise((resolve, reject) => {
      this.fs.open(path, "r", (err, fd) => {
        if (!err) {
          const storeBuffer = Buffer.alloc(length);
          this.fs.read(fd, storeBuffer, 0, length, start, (err) => {
            if (!err) {
              resolve(new Uint8Array(storeBuffer));
            } else {
              resolve(false);
            }
          });
        }
      });
    });
  },
};
