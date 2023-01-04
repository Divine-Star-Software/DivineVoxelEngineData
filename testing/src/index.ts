import { DVED } from "../out/Node/DivineVoxelEngineData.js";
import * as fs from "fs";
import { DVEDDataTypes, DVEDLocationData } from "../out/Types/DVED.types.js";
import { getRandomData } from "./functions.js";

DVED.$INIT({
  fs: fs,
  sectorSize: 4096,
  spaceBounds: {
    regions: { x: 9, y: 8, z: 9 },
    columns: { x: 4, y: 8, z: 4 },
    chunks: { x: 4, y: 4, z: 4 },
  },
});


const path = "D:/DSSoftware/DSLIBS/divineVoxelEngineData/testing/data";
const regionTool = DVED.getRegionTool();
regionTool.setPath(path);

const addData = (dataType: DVEDDataTypes, dimension = "main") => {
  const location: DVEDLocationData = [dimension, 0, 0, 0];
  regionTool.setDataType(dataType);
  let depth = 512;
  let xStart = 0;
  let xEnd = depth;
  let zStart = 0;
  let zEnd = depth;
  let i = 0;
  for (let x = xStart; x < xEnd; x += 16) {
    for (let z = zStart; z < zEnd; z += 16) {
      location[1] = x;
      location[3] = z;
      regionTool.setLocation(location);
      const string = location.toString();
      const stringData: number[] = [];
      let k = 2000;
      while (k--) {
        for (let i = 0; i < string.length; i++) {
          stringData.push(string.charCodeAt(i));
        }
      }
      i++;
      regionTool.saveColumn(new Uint8Array(stringData));
    }
  }

  for (let x = xStart; x < xEnd; x += 16) {
    for (let z = zStart; z < zEnd; z += 16) {
      location[1] = x;
      location[3] = z;
      regionTool.setLocation(location);
      const rawData = regionTool.setLocation(location).loadColumn();
      if (!rawData) continue;
      const stringData = new Uint8Array(rawData);
      let string = "";
      for (let i = 0; i < stringData.length; i++) {
        string += String.fromCharCode(stringData[i]);
      }
      //console.log(string);
    }
  }
};

await addData("world-data");

const test = () => {
  regionTool.setLocation(["main", 0, 0, 0]);
  const columnGens = regionTool.getAllColumns();
  if (!columnGens) return false;
  for (const column of columnGens) {
    const stringData = new Uint8Array(column[1]);
    let string = "";
    for (let i = 0; i < stringData.length; i++) {
      string += String.fromCharCode(stringData[i]);
    }
    console.log(string);
  }
};
