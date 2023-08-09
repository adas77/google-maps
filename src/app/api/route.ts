import { NextResponse } from "next/server";
import { customCSV, handleFormData } from "../utils/csv";

export async function GET() {
  const csv = await customCSV("doc/example.csv");
  return NextResponse.json(csv);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const pairs = await handleFormData(formData);
  if (!pairs) return NextResponse.error();
  return NextResponse.json(pairs);
}
