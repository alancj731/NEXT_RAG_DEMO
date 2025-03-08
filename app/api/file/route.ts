import { NextRequest, NextResponse} from "next/server";
import { saveToCollection } from "@/repository/astra_db";


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json(
            { error: "No file provided" },
            { status: 400 }
        );
    }
    const text = await file.text();
    console.log(text);

    return NextResponse.json(
        { message: "File uploaded" },
        { status: 200 }
    );
}