"use server";

"use strict";

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

function getRandomTopic(topics: string[]) {
    return topics[Math.floor(Math.random() * topics.length)];
}

export async function fetchWebdevQuestionGroq() {
    const topics = ["React.js", "Javascript", "HTML", "CSS", "Node.js", "HTTP", "Express.js", "Next.js", "SQL", "Databases", "Web security", "Concepts like authentication, cookies, JWT", "Computer Networks"];
    const randomTopic = getRandomTopic(topics);
    const prompt = `You are a helpful assistant who is helping me prepare for my software developer interview by giving me mock technical interview questions and answers. Ask me a question on the topic: ${randomTopic}. Your response should be of the format - Question: your_question Answer: your_answer. Also provide examples whenever necessary.`;
    const chatCompletion = await getGroqChatCompletion(prompt);
    return (chatCompletion.choices[0]?.message?.content || "");
}

export async function fetchConsultingQuestionGroq() {
    const prompt = "You are helping me prepare for a consulting interview and you have to ask me another detailed case study question and also give me the solution to it. the solution should follow the framework: Eight Buckets for Developing a Structured Framework 1. Market attractiveness 2. Competitive landscape 3. Company attractiveness OR company capabilities 4. Customer segmentation and needs 5. Financial considerations 6. Risks and mitigations 7. Synergies 8. Create your own bucket. Math Equations(make up any numbers for revenue and costs by yourself to show an example): The Profit Equation Profit = (Quantity * Price) – [(Quantity * Variable Costs) + Fixed Costs] The Breakeven Equation Quantity * (Price – Variable Costs) = Fixed Costs Structure for Conclusion I recommend that we (insert recommendation) for the following three reasons: 1) … 2) … 3) … For these reasons, I recommend that we (insert recommendation) For next steps, I would like to look into the following two things: 1) … 2) …. . Use numbering/bullet points wherever required to make your response better. Also ask only general(global)/India specific case studies."; 
    const chatCompletion = await getGroqChatCompletion(prompt);
    // Print the completion returned by the LLM.
    return (chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion(prompt: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "llama3-70b-8192"
    });
}
// module.exports = {
//     groqWebdev,
//     getGroqChatCompletion
// };
