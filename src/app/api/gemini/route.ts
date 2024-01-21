import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

import { parse } from "node-html-parser"

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

    // const GeminiContent: Message[] = [
    //     // give context to Gemini: must be an even amount of stuff, starting with user, model, then user, etc
    //     // https://github.com/songquanpeng/one-api/issues/836#issuecomment-1859646123
    //     {
    //         id: "prompt-engineering-1",
    //         role: "user",
    //         content: "Who are you?"
    //     }, {
    //         id: "prompt-engineering-2",
    //         role: "assistant",
    //         content: "I am roleplaying as a breast cancer doctor/advisor. I do not give medical diagnoses. If asked for a medical diagnosis, I will tell you to consult a licensed doctor. I focus on recommending lifestyle changes and actions to people who are suffering from breast cancer to make their lives better."
    //     }, {
    //         id: "prompt-engineering-3",
    //         role: "user",
    //         content: "What format will you respond to me in?"
    //     }, {
    //         id: "prompt-engineering-4",
    //         role: "assistant",
    //         content: `I will answer in a array format. If I answer a question, say some text, or simply respond, I prefix it with "TEXT:". If I recommend some sort of action you should take, I will prefix each action with "ACTION:". If I link something, I will prefix it with "ACTION_LINK:". I will include an ACTION_LINK for every ACTION. The ACTION_LINK will be something that I will search up online. For example, if I am encouraging you to eat a certain food like broccoli, I will give an ACTION_LINK to search up, "where to buy broccoli". For example, if I am recommending exercise, I will suggest: ". For each step/response "group" with related ACTION, ACTION_LINK, and TEXT, I will present it as a nested array of strings. Here is an example output: [["ACTION: Eat plenty of foods filled with antioxidants, such as strawberries." "ACTION_LINK: Where to buy strawberries", "TEXT: Antioxidants help protect cells from damage."], ["ACTION: Live an active lifestyle.", "ACTION_LINK: Easy exercises at home", "TEXT: Living a healthy, active lifestyle will boost mood and strengthen your body."]].`
    //     }, {
    //         id: "user-question-1",
    //         role: "user",
    //         content: question
    //     }
    // ]

    // const geminiStream = await genAI
    //     .getGenerativeModel({ model: 'gemini-pro' })
    //     .generateContentStream(buildGoogleGenAIPrompt(GeminiContent));


    // // Convert the response into a friendly text-stream
    // const stream = GoogleGenerativeAIStream(geminiStream);

    // const aiStream = new StreamingTextResponse(stream);

    // console.log(aiStream);

    // const jsonStream = await aiStream.json();

    // // Respond with the stream
    // return jsonStream;

    // generate an API key: https://makersuite.google.com/app/prompts/new_chat
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({
            error: "Missing API Key in server. Please contact the site administrator."
        }, { status: 500 });
    }

    const API_KEY = process.env.GEMINI_API_KEY

    const GeminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    // parse request body, which will be the question
    if (!request.body) {
        return NextResponse.json({
            error: "Missing body"
        }, { status: 400 });
    }

    // const reqJSON = await request.json();
    // const question = reqJSON.data;

    // build the request object to send
    const RequestBody = {
        "contents": [
            // give context to Gemini: must be an even amount of stuff, starting with user, model, then user, etc
            // https://github.com/songquanpeng/one-api/issues/836#issuecomment-1859646123
            {
                "role": "user",
                "parts": {
                    "text": "Who are you?"
                },
            },
            {
                "role": "model",
                "parts": {
                    "text": "I am roleplaying as a breast cancer doctor/advisor. I do not give medical diagnoses. If asked for a medical diagnosis, I will tell you to consult a licensed doctor. I focus on recommending lifestyle changes and actions to people who are suffering from breast cancer to make their lives better."
                },
            },
            // {
            //     "role": "model",
            //     "parts": {
            //         "text": `I am a breast cancer doctor/advisor, focusing on providing general advice for people at different stages of breast cancer. I do not provide medical diagnoses. I respond in an array format. I prefix responses with "TEXT:" for information, "ACTION:" for recommended actions, and "ACTION_LINK:" for corresponding working URLs. Example: [["ACTION: Include foods rich in antioxidants, like strawberries, in your diet.", "ACTION_LINK: https://www.instacart.com/store/s?k=strawberries", "TEXT: Antioxidants help protect cells from damage."], ["ACTION: Incorporate regular exercise.", "ACTION_LINK: https://www.healthline.com/health/fitness-exercise/at-home-workouts", "TEXT: A healthy, active lifestyle boosts mood and strengthens the body."], ["ACTION: Prioritize emotional well-being; consider mindfulness practices.", "ACTION_LINK: https://www.mindful.org/how-to-meditate/", "TEXT: Mindfulness can support mental health during challenging times."], ["ACTION: Stay connected with support groups.", "ACTION_LINK: https://www.breastcancer.org/tips/connect", "TEXT: Connecting with others facing similar challenges can provide valuable support."], ["ACTION: Ensure a well-balanced diet with a variety of nutrients.", "ACTION_LINK: https://www.cancer.org/cancer/breast-cancer/nutrition.html", "TEXT: Proper nutrition is crucial for overall health during treatment."]]`
            //     },
            // },
            {
                "role": "user",
                "parts": {
                    "text": "What format will you respond to me in?"
                },
            },
            {
                "role": "model",
                "parts": {
                    "text": `I will answer in a array format. If I answer a question, say some text, or simply respond, I prefix it with "TEXT:". If I recommend some sort of action you should take, I will prefix each action with "ACTION:". If I link something, I will prefix it with "ACTION_LINK:". I will include an ACTION_LINK for every ACTION. The ACTION_LINK will be something that I will search up online. For example, if I am encouraging you to eat a certain food like broccoli, I will give an ACTION_LINK to search up, "where to buy broccoli". For example, if I am recommending exercise, I will suggest: ". For each step/response "group" with related ACTION, ACTION_LINK, and TEXT, I will present it as a nested array of strings. Here is an example output: [["ACTION: Eat plenty of foods filled with antioxidants, such as strawberries." "ACTION_LINK: Where to buy strawberries", "TEXT: Antioxidants help protect cells from damage."], ["ACTION: Live an active lifestyle.", "ACTION_LINK: Easy exercises at home", "TEXT: Living a healthy, active lifestyle will boost mood and strengthen your body."]].`
                },
            },
            {
                "role": "user",
                "parts": {
                    "text": question
                },
            },
        ],
        "safety_settings": {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_LOW_AND_ABOVE"
        },
        "generation_config": {
            "temperature": 0.2,
            "topP": 0.8,
            "topK": 40
        }
    }

    // send request and get response
    const res = await fetch(GeminiEndpoint, {
        method: "POST",
        body: JSON.stringify(RequestBody)
    });

    const geminiRes = await res.json();
    // console.log(geminiRes)

    // console.log(geminiRes.candidates)
    let geminiTextArray = null;
    let first = true;
    // try {
    geminiTextArray = geminiRes.candidates[0].content.parts;
    const geminiText = geminiTextArray[0].text;
    let geminiTextObject: string[][] = JSON.parse(geminiText);

    // parse through the text and then figure out what to search up
    // console.log(geminiTextObject);
    for (const [actionIndex, action] of geminiTextObject.entries()) {
        let actionGroup = action;
        for (const [stepIndex, step] of actionGroup.entries()) {
            // if it is an ACTION_LINK, do a search
            if (step.includes("ACTION_LINK:")) {
                // parse out the query
                // TODO: We would probably need to do some gemini output validation here
                const query = step.split(": ")[1].toLocaleLowerCase();
                // make the duck duck go query
                // add + for query
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
                const hit = hits[0].innerHTML.trim();
                // replace it in the action link
                actionGroup[stepIndex] = `ACTION_LINK: ${hit}`
            }
        }
        geminiTextObject[actionIndex] = actionGroup
    }

    const nextRes = NextResponse.json({
        data: geminiTextObject
    }, { status: 201 });
    return nextRes;
    // } catch (e) {
    //     // console.error(geminiRes.candidates)
    //     // console.error(e);
    //     return NextResponse.json({
    //         error: e
    //     }, { status: 201 });;
    // }
}