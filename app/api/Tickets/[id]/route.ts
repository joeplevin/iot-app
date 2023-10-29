import HSRecord from "@/app/(models)/HSRecord";
import { NextRequest, NextResponse } from "next/server";

interface Iprops {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Iprops }) {
  try {
    const { id } = params;
    const foundTicket = await HSRecord.findOne({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Iprops }) {
  try {
    const { id } = params;
    await HSRecord.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
