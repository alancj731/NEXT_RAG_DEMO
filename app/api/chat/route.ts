// import { openai } from "@ai-sdk/openai";
import { db } from "@/repository/astra_db";
import { TogetherAiService } from "@/services/together.ai.service";

// Allow streaming responses up to 30 seconds, used in the vercel EDGE function
export const maxDuration = 30;
const { NEXT_PUBLIC_ASTRA_DB_COLLECTION } = process.env;

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }


  const lastMessage = messages[messages.length - 1];

  let docContext = "";

  try {
    try {
        const collection = db.collection(NEXT_PUBLIC_ASTRA_DB_COLLECTION || "")
        const cursor =  collection
          .find(
            {},
            {
              limit:3,
              sort:{ $vectorize: lastMessage.content }
            }
        );

        const documents = await cursor.toArray();
        const docsMap = documents?.map((doc) => doc.text);
        docContext = JSON.stringify(docsMap);
      }
    catch (error) {
      console.error("Error getting documents:", error);
    }

    const template = {
      role: "system",

      content: `You are asking about the following question
            ---------------------
            QUESTION START 
            ${lastMessage}
            QUESTION END
            --------------------- 
            
            Here are some context documents:
            ---------------------
            CONTEXT START 
            ${docContext}
            CONTEXT END
            ---------------------
            
            If you can't find answer in the context, you need to answer based on existing knowledge.
            Don't mention the context documents in your response.
            `,
    };


    messages.push(template);
    

    // const result = streamText({
    //   model: openai("gpt-4o-mini"),
    //   messages,
    // });

    const result = await TogetherAiService.getInstance().streamTextFromAI(messages);
    const readableStream = result.toDataStreamResponse().body;

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("Error getting openAi response:", error);
    return new Response("Error getting openAi response", { status: 500 });
  }
}
