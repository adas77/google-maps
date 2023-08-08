import { NextResponse } from "next/server";
import { customCSV } from "../utils/csv";

export async function GET() {
  const csv = await customCSV(
    "doc/Czestotliwosc_tras_do_analizy_Petrotel_Q2.2023.csv",
    true
  );

  console.log(csv);

  return NextResponse.json(csv);
}
