import { NextRequest, NextResponse } from "next/server";

/**
 * Makes a request to Google Gemini for personalized recommendations
 * @param request 
 * @param param1 
 */
export async function POST(request: NextRequest, { params }: any): Promise<any> {

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

    const reqJSON = await request.json();
    const question = reqJSON.data;

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
    let geminiText = null;
    try {
        geminiText = geminiRes.candidates[0].content.parts
        console.log(geminiText);
        const nextRes = NextResponse.json({
            data: geminiText[0].text
        }, { status: 201 });
        return nextRes;
    } catch (e) {
        console.error(geminiRes.candidates)
        const nextRes = NextResponse.json({
            error: e
        }, { status: 201 });

        return nextRes;
    }

}
