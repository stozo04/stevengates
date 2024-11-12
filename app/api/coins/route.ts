import { data } from "@/app/lib/constants";
import { NextResponse } from "next/server";
export async function GET() {
    // const numberOne = 5;
    // const numberTwo = 6;

    // return NextResponse.json({ value: numberOne + numberTwo });
    // Make call to AWS - Get Data

    return NextResponse.json(data);
}