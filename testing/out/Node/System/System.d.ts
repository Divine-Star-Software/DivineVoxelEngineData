/// <reference types="node" />
import type * as FileSystem from "fs";
import type { DVEDSyncFile } from "../../Types/DVED.types";
export declare const System: {
    fs: typeof FileSystem;
    $INIT(fs: typeof FileSystem): void;
    updateFolder(folder: string): void;
    mkdirs(paths: string[]): void;
    sync: {
        createFile(path: string, size?: number, mode?: number): boolean;
        createAndOpenFile(path: string, size?: number): false | DVEDSyncFile;
        openFile(filePath: string, showErrors?: boolean): DVEDSyncFile | false;
    };
};
