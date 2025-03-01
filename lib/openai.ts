import { OpenAI } from 'openai';
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

let ai = null as OpenAI | null;

export const myopenai = () =>{
    if(!ai){
        ai = new OpenAI({apiKey});
    }
    return ai;
}