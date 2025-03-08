import { createTogetherAI, type TogetherAIProvider } from "@ai-sdk/togetherai";
import { generateText, streamText } from "ai";
// import Together from "together-ai";

const apiKey = process.env.NEXT_PUBLIC_TOGETHER_AI_API_KEY || "";
const MODEL =
  process.env.TOGETHER_MODEL || "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free";
  // process.env.TOGETHER_MODEL || "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free";

  

export class TogetherAiService {
  static instace: TogetherAiService | null = null;
  public togetherai: TogetherAIProvider | null = null;
  private apiKey: string;

  static getInstance() {
    if (!TogetherAiService.instace) {
      TogetherAiService.instace = new TogetherAiService();
    }
    return TogetherAiService.instace;
  }

  constructor() {
    if (apiKey === "") {
      throw new Error("API key is required");
    } else {
      this.apiKey = apiKey;
      this.togetherai = createTogetherAI({ apiKey: this.apiKey });
      console.log("TogetherAiService initialized");
    }
  }

  async textFromAI(prompt: string) {
    if (!this.togetherai) {
      throw new Error("TogetherAi is not initialized");
    }
    try {
      const { text } = await generateText({
        model: this.togetherai(MODEL),
        messages: [{ role: "user", content: prompt }],
      });

      if (text) {
        return text;
      } else {
        throw new Error("No response from AI");
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async streamTextFromAI(messages: any[]) {
    if (!this.togetherai) {
      throw new Error("TogetherAi is not initialized");
    }
    try{
      const result = streamText({
        model: this.togetherai(MODEL),
        messages: messages,
      }); 
      console.log("Stream result", result);
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
