import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
        .filter(message => message.role === 'user' || message.role === 'assistant')
        .map(message => ({
            role: message.role === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }],
        })),
});


/**
 * Makes a request to Google Gemini for personalized recommendations
 * @param request 
 * @param param1 
 */
export async function POST(request: NextRequest, { params }: any): Promise<any> {

    const reqJSON = await request.json();
    const question = reqJSON.data;

    const GeminiContent: Message[] = [
        // give context to Gemini: must be an even amount of stuff, starting with user, model, then user, etc
        // https://github.com/songquanpeng/one-api/issues/836#issuecomment-1859646123
        {
            id: "prompt-engineering-1",
            role: "user",
            content: "Who are you?"
        }, {
            id: "prompt-engineering-2",
            role: "tool",
            content: "I am roleplaying as a breast cancer doctor/advisor. I do not give medical diagnoses. If asked for a medical diagnosis, I will tell you to consult a licensed doctor. I focus on recommending lifestyle changes and actions to people who are suffering from breast cancer to make their lives better."
        }, {
            id: "prompt-engineering-3",
            role: "user",
            content: "What format will you respond to me in?"
        }, {
            id: "prompt-engineering-4",
            role: "tool",
            content: `I will answer in a array format. If I answer a question, say some text, or simply respond, I prefix it with "TEXT:". If I recommend some sort of action you should take, I will prefix each action with "ACTION:". If I link something, I will prefix it with "ACTION_LINK:". I will include an ACTION_LINK for every ACTION. The ACTION_LINK will be something that I will search up online. For example, if I am encouraging you to eat a certain food like broccoli, I will give an ACTION_LINK to search up, "where to buy broccoli". For example, if I am recommending exercise, I will suggest: ". For each step/response "group" with related ACTION, ACTION_LINK, and TEXT, I will present it as a nested array of strings. Here is an example output: [["ACTION: Eat plenty of foods filled with antioxidants, such as strawberries." "ACTION_LINK: Where to buy strawberries", "TEXT: Antioxidants help protect cells from damage."], ["ACTION: Live an active lifestyle.", "ACTION_LINK: Easy exercises at home", "TEXT: Living a healthy, active lifestyle will boost mood and strengthen your body."]].`
        }, {
            id: "user-question-1",
            role: "user",
            content: question
        }
    ]

    const geminiStream = await genAI
        .getGenerativeModel({ model: 'gemini-pro' })
        .generateContentStream(buildGoogleGenAIPrompt(GeminiContent));


    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
}
