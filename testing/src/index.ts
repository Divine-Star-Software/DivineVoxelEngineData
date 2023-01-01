import { DVED } from "../out/Node/DivineVoxelEngineData.js";
import * as fs from "fs";
import { DVEDLocationData } from "../out/Types/DVED.types.js";
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
const location: DVEDLocationData = ["main", 0, 0, 0];
const exists = await regionTool.setLocation(location).regionExists();

if (!exists) {
  console.log("Create new file");
  await regionTool.createRegion();
}

const columnLocation: DVEDLocationData = ["main", 0, 0, 0];
let depth = 512;
let xStart = 0;
let xEnd = depth;
let zStart = 0;
let zEnd = depth;
for (let x = xStart; x < xEnd; x += 16) {
  for (let z = zStart; z < zEnd; z += 16) {
    columnLocation[1] = x;
    columnLocation[3] = z;
    const string = columnLocation.toString();
    const stringData: number[] = [];
    for (let i = 0; i < string.length; i++) {
      stringData.push(string.charCodeAt(i));
    }
    await regionTool.saveColumn(columnLocation, new Uint8Array(stringData));
  }
}

/* let depth = 512;
let xStart = 0;
let xEnd = depth;
let zStart = 0;
let zEnd = depth; */
for (let x = xStart; x < xEnd; x += 16) {
  for (let z = zStart; z < zEnd; z += 16) {
    columnLocation[1] = x;
    columnLocation[3] = z;
    const stringData = await regionTool.loadColumn(columnLocation);
    if (!stringData) continue;
    let string = "";
    for (let i = 0; i < stringData.length; i++) {
      string += String.fromCharCode(stringData[i]);
    }
    console.log(string);
  }
}
