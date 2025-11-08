import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { my_test_data: [{ custom_data: "test" }] },
    { status: 404 }
  );
}
