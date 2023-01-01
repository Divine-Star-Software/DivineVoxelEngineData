import { TagManager } from "../libs/divineBinaryTags/TagManager.js";
import { VoxelSpaces } from "../libs/voxelSpaces/VoxelSpaces.js";
import type * as FileSystem from "fs";
import { DVEDSystem } from "./DVEDSystem.js";
import { RegionTool } from "./Tools/RegionTool.js";
import { RegionHeaderData, SecotrData } from "./Constants/DVED.constants.js";
const spaces = VoxelSpaces.getVoxelSpaces();
const regionTagManager = new TagManager("DVED-region");
type Vector3 = { x: number; y: number; z: number };

export const DVED = {
  spaces: spaces,
  tags: regionTagManager,
  $INIT(data: {
    fs: typeof FileSystem;
    sectorSize: number;
    spaceBounds: {
      regions: Vector3;
      columns: Vector3;
      chunks: Vector3;
    };
  }) {
    SecotrData.byteSize = data.sectorSize;
    DVEDSystem.setFS(data.fs);
    spaces.setDimensions(data.spaceBounds);
    regionTagManager.registerTag({
      id: "#dved-column-sector-index",
      type: "typed-number-array",
      numberType: "16ui",
      length: spaces.region.getColumnVolume(),
    });
    regionTagManager.registerTag({
      id: "#dved-column-legnth-index",
      type: "typed-number-array",
      numberType: "16ui",
      length: spaces.region.getColumnVolume(),
    });
    regionTagManager.$INIT();
    RegionHeaderData.byteSize = regionTagManager.tagSize;
  },

  getRegionTool() {
    return new RegionTool();
  },
};
