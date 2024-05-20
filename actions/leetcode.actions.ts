"use server";

import fs from 'fs';

export const fetchLeetcodeQuestion = async () => {
    try {
        const data = fs.readFileSync('slugs.json', 'utf-8');
        
        // Parse the JSON file
        const slugs = JSON.parse(data);
        
        // Get a random slug
        const randomSlugNumber = Math.floor(Math.random() * 1000) + 1; // generates a random number between 1 and 1000
        const randomSlug = slugs[randomSlugNumber.toString()];

        const response = await fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${randomSlug}`);

        const question = await response.json();
        
        // Extract required fields
        const extractedData = {
            link: question.link,
            questionTitle: question.questionTitle,
            difficulty: question.difficulty,
            question: question.question,
            exampleTestcases: question.exampleTestcases,
            topicTags: question.topicTags.map((tag: { name: any; }) => tag.name),
            similarQuestions: JSON.parse(question.similarQuestions).map((similarQuestion: { title: any; titleSlug: any; difficulty: any; }) => ({
                title: similarQuestion.title,
                titleSlug: similarQuestion.titleSlug,
                difficulty: similarQuestion.difficulty
            }))
        };

        // console.log(extractedData);
        return extractedData;

    } catch (e) {
        console.log(e);
    }
}
