import type * as FileSystem from "fs";
import { RegionTool } from "./Tools/RegionTool.js";
import { TagManager } from "./Libs/divineBinaryTags/TagManager.js";
declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export declare const DVED: {
    spaces: {
        region: import("./Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
            chunkBounds: {
                x: number;
                y: number;
                z: number;
            };
            columnBounds: {
                x: number;
                y: number;
                z: number;
            };
            getChunkVolume(): number;
            getColumnVolume(): number;
        };
        column: import("./Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
        chunk: import("./Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
            _regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            getRegionPositonx(): {
                x: number;
                y: number;
                z: number;
            };
            getRegionPositonxXYZ(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getRegionIndex(): number;
            getRegionIndexXYZ(x: number, y: number, z: number): number;
        };
        voxel: import("./Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
        setDimensions(data: {
            regions: {
                x: number;
                y: number;
                z: number;
            };
            columns: {
                x: number;
                y: number;
                z: number;
            };
            chunks: {
                x: number;
                y: number;
                z: number;
            };
        }): void;
    };
    regionTags: TagManager;
    system: {
        fs: typeof FileSystem;
        $INIT(fs: typeof FileSystem): void;
        mkdirs(paths: string[]): void;
        createFile(path: string, size?: number, mode?: number): boolean;
        createAndOpenFile(path: string, size?: number): false | import("../Types/DVED.types.js").DVEDFile;
        openFile(filePath: string, showErrors?: boolean): false | import("../Types/DVED.types.js").DVEDFile;
    };
    path: {
        _dataPath: string;
        _dataFolder: string;
        getDataPath(fileName: string): string;
        $INIT(): void;
    };
    $INIT(data: {
        fs: typeof FileSystem;
        sectorSize: number;
        spaceBounds: {
            regions: Vector3;
            columns: Vector3;
            chunks: Vector3;
        };
    }): void;
    getRegionTool(): RegionTool;
};
export {};
