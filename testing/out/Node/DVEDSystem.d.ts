/// <reference types="node" />
import type * as FileSystem from "fs";
export declare const DVEDSystem: {
    fs: typeof FileSystem;
    setFS(fs: typeof FileSystem): void;
    fileExists(path: string): Promise<number>;
    createFile(path: string, data: ArrayBuffer): Promise<unknown>;
    stringToUint8Array(string: string): void;
    writeAtByteIndex(path: string, start: number, data: ArrayBuffer): Promise<unknown>;
    readAtByteIndex(path: string, start: number, length: number): Promise<Uint8Array | false>;
    clearSector(path: string, start: number): Promise<unknown>;
    writeToSector(path: string, start: number, data: ArrayBuffer): Promise<unknown>;
    readSectors(path: string, start: number, length: number): Promise<Uint8Array | false>;
};
