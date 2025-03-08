import { DataAPIClient} from "@datastax/astra-db-ts";
import { splitter } from "@/lib/splitter";

const {
    NEXT_PUBLIC_ASTRA_DB_KEYSPACE, 
    NEXT_PUBLIC_ASTRA_DB_COLLECTION, 
    NEXT_PUBLIC_ASTRA_DB_URL,
    NEXT_PUBLIC_ASTRA_DB_API_TOKEN} 
= process.env;


if (
    !NEXT_PUBLIC_ASTRA_DB_API_TOKEN
    ||
    !NEXT_PUBLIC_ASTRA_DB_KEYSPACE
    ||
    !NEXT_PUBLIC_ASTRA_DB_COLLECTION
    ||
    !NEXT_PUBLIC_ASTRA_DB_URL
) {
    throw new Error('Missing required environment variables for AstraDB');
}

export const client = new DataAPIClient(NEXT_PUBLIC_ASTRA_DB_API_TOKEN);

export const db = client.db(NEXT_PUBLIC_ASTRA_DB_URL, {keyspace: NEXT_PUBLIC_ASTRA_DB_KEYSPACE});

export async function saveToCollection (content: string){
    try{
        const collection = db.collection(NEXT_PUBLIC_ASTRA_DB_COLLECTION || '');
        
        const chunks = await splitter.splitText(content);
        
        for (const chunk of chunks){

            const result = await collection.insertOne({
                text: chunk,
                $vectorize: chunk,
            });
        }
        return true;
    }
    catch (error){
        console.error('Error saving to collection:', error);  
        return false;
    }

}