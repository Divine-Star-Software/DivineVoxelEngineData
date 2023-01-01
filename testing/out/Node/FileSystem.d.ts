import type * as FileSystem from "fs/promises";
export declare const DVEDSystem: {
    fs: typeof FileSystem;
    setFS(fs: typeof FileSystem): void;
    fileExists(path: string): Promise<boolean>;
};
