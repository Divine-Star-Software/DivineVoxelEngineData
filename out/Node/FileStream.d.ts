import type * as FileSystem from "fs";
export declare const FileStream: {
    fs: typeof FileSystem;
    path: string;
    setFS(fs: typeof FileSystem): void;
    setPath(path: string): void;
};
