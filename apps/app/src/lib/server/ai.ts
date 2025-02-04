// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai')

// const apiKey = process.env.GEMINI_API_KEY
// const genAI = new GoogleGenerativeAI(apiKey)

// const model = genAI.getGenerativeModel({
//   model: 'gemini-2.0-flash-exp',
//   systemInstruction:
//     'You are a mobile mental health app called "Hovanka". Your purpose is to generate short title describing mental state of the article provided. Neutral to positive tone. Friendly and informal style.',
// })

// const generationConfig = {
//   temperature: 0.8,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 60,
//   responseMimeType: 'application/json',
//   responseSchema: {
//     type: 'object',
//     properties: {
//       response: {
//         type: 'string',
//       },
//     },
//   },
// }

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   })

//   const result = await chatSession.sendMessage('INSERT_INPUT_HERE')
//   console.log(result.response.text())
// }

// run()
