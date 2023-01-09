import { DVED } from "../out/Node/DivineVoxelEngineData.js";
import * as fs from "fs";
import { DVEDDataTypes, DVEDLocationData } from "../out/Types/DVED.types.js";
import { getRandomData } from "./functions.js";

DVED.$INIT({
  fs: fs,
  dataDirecotry: "dved-test",
  sectorSize: 4096,
  spaceBounds: {
    regions: { x: 9, y: 8, z: 9 },
    columns: { x: 4, y: 8, z: 4 },
    chunks: { x: 4, y: 4, z: 4 },
  },
});

const regionTool = DVED.getRegionTool();
let depth = 512;
let xStart = 0;
let xEnd = depth;
let zStart = 0;
let zEnd = depth;
const addData = (dataType: DVEDDataTypes, dimension = "main") => {
  const location: DVEDLocationData = [dimension, 0, 0, 0];
  regionTool.setDataType(dataType);

  let i = 0;
  for (let x = xStart; x < xEnd; x += 16) {
    for (let z = zStart; z < zEnd; z += 16) {
      location[1] = x;
      location[3] = z;
      regionTool.setLocation(location);
      const string = location.toString();
      const stringData: number[] = [];
      let k = 2;
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

const logPath = "./" + Date.now() + "-log.txt";
fs.writeFileSync(logPath, "");

const addSeperator = () => {
  fs.appendFileSync(
    logPath,
    "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||" + "\n"
  );
};
const addToLog = (data: string) => {
  fs.appendFileSync(logPath, data + "\n");
};

const allStatus = (state: string) => {
  for (let x = xStart; x < xEnd; x += 16) {
    for (let z = zStart; z < zEnd; z += 16) {
      addSeperator();
      const location: DVEDLocationData = ["main", x, 0, z];
      regionTool.setLocation(location);
      addToLog(`${location.toString()}:${state}`);
      addToLog("region exists => " + regionTool.regionExists());
      addToLog("region has column => " + regionTool.regionHasColumn());
      addToLog("column timestamp => " + regionTool.getColumnTimestamp());
    }
  }
};
const singleStatus = (state: string, index: number) => {
  addSeperator();
  const positon = DVED.spaces.column.getPositionFromIndex(index);
  const location: DVEDLocationData = ["main", positon.x, 0, positon.z];
  regionTool.setLocation(location);
  addToLog(`${location.toString()}:${state}`);
  addToLog("region exists => " + regionTool.regionExists());
  addToLog("region has column => " + regionTool.regionHasColumn());
  addToLog("column timestamp => " + regionTool.getColumnTimestamp());
};
const save = (length: number) => {
  regionTool.setLocation(["main", 0, 0, 0]).saveColumn(getRandomData(length));
};
//const numColumns = DVED.spaces.region.getColumnVolume();

singleStatus("before", 0);
save(2);
singleStatus("after", 0);

setTimeout(() => {
  singleStatus("before", 0);
  save(5000);
  singleStatus("after", 0);
}, 1000);
/* allStatus("before");
await addData("world-data");
allStatus("after");
 */
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
