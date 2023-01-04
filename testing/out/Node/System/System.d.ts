import type * as FileSystem from "fs";
import { DVEDFile } from "Types/DVED.types";
export declare const System: {
    fs: typeof FileSystem;
    $INIT(fs: typeof FileSystem): void;
    mkdirs(paths: string[]): void;
    createFile(path: string, size?: number, mode?: number): boolean;
    createAndOpenFile(path: string, size?: number): false | DVEDFile;
    openFile(filePath: string, showErrors?: boolean): DVEDFile | false;
};
