import { randomUUID } from "crypto";
import csv from "csv-parser";
import fs from "fs";

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
  randomize = false
): Promise<Pair[]> {
  const rand = () => (randomize ? Math.random() / 10 : 0);
  const date = (date: string) => new Date(Date.parse(date));

  const csv = await readCSVFile(filePath);

  const pairs: Pair[] = csv.map((r) => {
    const val: string[] = Object.values(r)[0].split(";");

    const timestamp_s: Date = date(val[5]);
    const timestamp_e: Date = date(val[6]);

    const lat_s: number = +val[15] + rand();
    const lat_e: number = +val[16] + rand();
    const lng_s: number = +val[17] + rand();
    const lng_e: number = +val[18] + rand();

    const pair: Pair = {
      a: {
        lat: lat_s,
        lng: lng_s,
        timestamp: timestamp_s,
      },
      b: {
        lat: lat_e,
        lng: lng_e,
        timestamp: timestamp_e,
      },
      id: randomUUID(),
      visible: false,
    };
    return pair;
  });
  return pairs;
}
