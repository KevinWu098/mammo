import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { parse } from "node-html-parser";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
    contents: messages
        .filter(
            (message) =>
                message.role === "user" || message.role === "assistant",
        )
        .map((message) => ({
            role: message.role === "user" ? "user" : "model",
            parts: [{ text: message.content }],
        })),
});

/**
 * Makes a request to Google Gemini for personalized recommendations
 * @param request
 * @param param1
 */
export async function POST(
    request: NextRequest,
    { params }: any,
): Promise<any> {
    const reqJSON = await request.json();
    const question = reqJSON.data;

    // generate an API key: https://makersuite.google.com/app/prompts/new_chat
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
            {
                error: "Missing API Key in server. Please contact the site administrator.",
            },
            { status: 500 },
        );
    }

    const API_KEY = process.env.GEMINI_API_KEY;

    const GeminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    // parse request body, which will be the question
    if (!request.body) {
        return NextResponse.json(
            {
                error: "Missing body",
            },
            { status: 400 },
        );
    }

    // const reqJSON = await request.json();
    // const question = reqJSON.data;

    // build the request object to send
    const RequestBody = {
        contents: [
            // give context to Gemini: must be an even amount of stuff, starting with user, model, then user, etc
            // https://github.com/songquanpeng/one-api/issues/836#issuecomment-1859646123
            {
                role: "user",
                parts: {
                    text: "Who are you?",
                },
            },
            {
                "role": "model",
                "parts": {
                    "text": "I am roleplaying as a breast cancer doctor/advisor. I do not give medical diagnoses. If asked for a medical diagnosis, I will tell you to consult a licensed doctor. I can only recommend lifestyle changes and actions that someone suffering from breast cancer can take to make their lives better."
                },
            },
            // {
            //     "role": "model",
            //     "parts": {
            //         "text": `I am a breast cancer doctor/advisor, focusing on providing general advice for people at different stages of breast cancer. I do not provide medical diagnoses. I respond in an array format. I prefix responses with "TEXT:" for information, "ACTION:" for recommended actions, and "ACTION_LINK:" for corresponding working URLs. Example: [["ACTION: Include foods rich in antioxidants, like strawberries, in your diet.", "ACTION_LINK: https://www.instacart.com/store/s?k=strawberries", "TEXT: Antioxidants help protect cells from damage."], ["ACTION: Incorporate regular exercise.", "ACTION_LINK: https://www.healthline.com/health/fitness-exercise/at-home-workouts", "TEXT: A healthy, active lifestyle boosts mood and strengthens the body."], ["ACTION: Prioritize emotional well-being; consider mindfulness practices.", "ACTION_LINK: https://www.mindful.org/how-to-meditate/", "TEXT: Mindfulness can support mental health during challenging times."], ["ACTION: Stay connected with support groups.", "ACTION_LINK: https://www.breastcancer.org/tips/connect", "TEXT: Connecting with others facing similar challenges can provide valuable support."], ["ACTION: Ensure a well-balanced diet with a variety of nutrients.", "ACTION_LINK: https://www.cancer.org/cancer/breast-cancer/nutrition.html", "TEXT: Proper nutrition is crucial for overall health during treatment."]]`
            //     },
            // },
            {
                role: "user",
                parts: {
                    text: "What format will you respond to me in?",
                },
            },
            {
                "role": "model",
                "parts": {
                    "text": `I will answer in an array of objects format. If it is some sort of explanation, the key will be "text". If I recommend an action you should take, the key will be "action". I will always include an "action_link" key for every "action". The "action_link" will be something that I will search up online to take that action. For example, if I am encouraging you to eat a certain food like broccoli, I will give an ACTION_LINK to search up: "where to buy broccoli". Also, classify each action into one of the following categories: "self-care", "purchase", "diet", "medical", "exercise", and "other". If there is no action, classify the text into one of the categories. Example: [{"text": "Eat plenty of foods filled with antioxidants, like strawberries.","action": "Eat some strawberries.","action_link": "Where to buy strawberries","action_tag":"diet"},{"text": "Exercising can improve overall health and outcomes.","action": "Exercise at home.","action_link": "Easy exercises at home","action_tag":"exercise"}]`
                },
            },
            {
                role: "user",
                parts: {
                    text: question,
                },
            },
        ],
        safety_settings: {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_LOW_AND_ABOVE",
        },
        generation_config: {
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
        },
    };

    // send request and get response
    const res = await fetch(GeminiEndpoint, {
        method: "POST",
        body: JSON.stringify(RequestBody),
    });

    const geminiRes = await res.json();

    // console.log(geminiRes.candidates)
    let geminiTextArray = null;
    try {
        geminiTextArray = geminiRes.candidates[0].content.parts;
        const geminiText = geminiTextArray[0].text;
        let geminiTextObject: { text: string, action?: string, action_link?: string }[] = JSON.parse(geminiText);

        // parse through the text and then figure out what to search up
        // console.log(geminiTextObject);
        for (const [actionIndex, step] of geminiTextObject.entries()) {
            if (step.action && step.action_link) {
                // if it is an ACTION_LINK, do a search
                // parse out the query
                const query = step.action_link;
                const hit = await getFirstResultLink(query)
                // scrape duck duck go
                // replace it in the action link
                step.action_link = hit
            }
            geminiTextObject[actionIndex] = step
        }
        // console.log(JSON.stringify(geminiTextObject))
        const nextRes = NextResponse.json({
            data: geminiTextObject
        }, { status: 201 });
        return nextRes;
    } catch (e) {
        console.error(geminiRes.candidates)
        console.error(e);
        return NextResponse.json({
            data: `[{"text": "I cannot answer this. Please consult a licensed doctor for more information.","action": "Consult a licensed doctor for more information.","action_link": "${await getFirstResultLink("doctors near me")}","action_tag":"medical"},]`
        }, { status: 201 });
    }
}

async function getFirstResultLink(query: string) {
    const ddgQuery = query.split(" ").join("+");
    // make the query and parse response
    // https://stackoverflow.com/questions/37012469/duckduckgo-api-getting-search-results
    const ddgURL = `https://html.duckduckgo.com/html/?q=${ddgQuery}`
    const ddgSearchRes = await fetch(ddgURL);
    const ddgHTML = await ddgSearchRes.text()

    // scrape the first URL
    const root = parse(ddgHTML);
    // grab the anchor tags with the results
    const hits = root.querySelectorAll(".result__url");

    // scrape the first hit
    return hits[0].innerHTML.trim();
}
