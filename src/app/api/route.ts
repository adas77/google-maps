import { NextResponse } from "next/server";
import { customCSV } from "../utils/csv";

export async function GET() {
  const csv = await customCSV(
    "doc/Czestotliwosc_tras_do_analizy_Petrotel_Q1.2023.csv",
    0
  );

  console.log(csv);

  return NextResponse.json(csv);
}
