import { randomUUID } from "crypto";
import csv from "csv-parser";
import { PathLike, createReadStream } from "fs";
import { writeFile } from "fs/promises";
import CSV_FORM_CONFIG from "./consts";
import { strToDate } from "./format";

export async function customCSV(
  filePath: PathLike,
  randomize = false
): Promise<Pair[]> {
  const rand = () => (randomize ? Math.random() / 10 : 0);
  const csv = await readCSVFile(filePath);

  const pairs: Pair[] = csv.map((r) => {
    const val: string[] = Object.values(r)[0].split(";");
    const timestamp_s: number = strToDate(val[5]);
    const timestamp_e: number = strToDate(val[6]);
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
      visible: true,
    };
    return pair;
  });
  return pairs;
}

export async function handleFormData(form: FormData): Promise<Pair[] | null> {
  const file = form.get(CSV_FORM_CONFIG.form_key) as File;
  if (file && file.type === CSV_FORM_CONFIG.mime) {
    const fname = await saveFile(file);
    if (fname) {
      const pairs = await customCSV(fname);
      return pairs;
    }
  }
  return null;
}

async function readCSVFile(filePath: PathLike): Promise<object[]> {
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

async function saveFile(file: File): Promise<string | null> {
  const text = await file.text();
  const fname = `upload/${Date.now()}_${randomUUID()}.csv`;
  try {
    await writeFile(fname, text);
    return fname;
  } catch (error) {
    return null;
  }
}
