import { TagManager } from "../libs/divineBinaryTags/TagManager.js";
import type * as FileSystem from "fs";
import { RegionTool } from "./Tools/RegionTool.js";
declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};
export declare const DVED: {
    spaces: {
        region: import("../libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
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
        column: import("../libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
        chunk: import("../libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
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
        voxel: import("../libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
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
    tags: TagManager;
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
