import { NextRequest, NextResponse} from "next/server";
import { scrapePage } from "@/lib/scraper";
import { getQueryParams } from "@/lib/utils";
import { saveToCollection } from "@/repository/astra_db";

export async function GET(req: NextRequest) {
    const url = getQueryParams(req, 'url');

    if (url === null) {
        return NextResponse.json(
            { error: "URL parameter is required" },
            { status: 400 }
        );
    } 

    let text;

    if (url) {
        console.log('url:', url);
        text = await scrapePage(url as string);
        if(text){
            const saved = await saveToCollection(text);
            if (!saved){
                return NextResponse.json(
                    { error: "Error saving to collection" },
                    { status: 500 }
                );
            }
            return NextResponse.json(
                { message: "Webpage saved to vector collection" },
                { status: 200 }
            );
        }
    }

    if (!text) {   

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
    else{
        console.log('text:', text?.length);
        return NextResponse.json(
            { text },
            { status: 200 }
        );
    }
}
