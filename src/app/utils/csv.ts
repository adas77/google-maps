import fs from "fs";
import csv from "csv-parser";
import { randomInt } from "crypto";

export async function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export async function customCSV(
  filePath: string,
  randomize?: number
): Promise<Pair[]> {
  const csv = await readCSVFile(filePath);

  const pairs: Pair[] = csv.map((r) => {
    const val: string = Object.values(r)[0];
    const s = val.split(";");
    const rand = randomize && randomize >= 1 ? randomInt(randomize) : 0;

    const lat_s: number = +s[15] + rand;
    const lat_e: number = +s[16] + rand;
    const lng_s: number = +s[17] + rand;
    const lng_e: number = +s[18] + rand;
    const pair: Pair = {
      a: {
        lat: lat_s,
        lng: lng_s,
      },
      b: {
        lat: lat_e,
        lng: lng_e,
      },
    };
    return pair;
  });
  return pairs;
}
