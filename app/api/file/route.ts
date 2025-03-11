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
    try{
        const saved = await saveToCollection(text);
        if (!saved){
            return NextResponse.json(
                { error: "Error saving to collection" },
                { status: 500 }
            );
        }
        else{
            return NextResponse.json(
                { message: "File uploaded to database" },
                { status: 200 }
            );
        }
    }
    catch (error){
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}