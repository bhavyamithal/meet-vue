"use client";

import { fetchLeetcodeQuestion } from '@/actions/leetcode.actions';
import React, { useState } from 'react';

type interviewType = 'dsa' | 'webdev' | 'consulting';

interface QuestionType {
  link: string;
  questionTitle: string;
  difficulty: string;
  question: string;
  exampleTestcases: string;
  topicTags: string[];
  similarQuestions: {
    title: string;
    titleSlug: string;
    difficulty: string;
  }[];
}

const RecommendedQuestions = ({ type }: { type: interviewType }) => {
  const [question, setQuestion] = useState<QuestionType | undefined>();
  const [isFirstTime, setIsFirstTime] = useState(true);

  async function getAnotherQuestion() {
    switch (type) {
      case 'dsa':
        const newQuestion = await fetchLeetcodeQuestion();
        setQuestion(newQuestion);
        setIsFirstTime(false);
        break;
      // Handle other cases for 'webdev' and 'consulting' if needed
      default:
        break;
    }
  }

  return (
    <div className="container w-full">
      <div className="shadow-lg w-full rounded-lg h-96 overflow-y-auto custom-scrollbar">
        {question ? (
          <div>
            <h1 className="text-xl font-bold mb-4">{question.questionTitle}</h1>
            <div className="mb-4 text-sm" dangerouslySetInnerHTML={{ __html: question.question }} />
            <div className="mb-4">
              <h2 className="text-md font-semibold">Difficulty: {question.difficulty}</h2>
            </div>
            <div className="mb-4">
              <h2 className="text-md font-semibold">Example Test Cases:</h2>
              <pre className="bg-gray-600 p-2 rounded text-sm">{question.exampleTestcases}</pre>
            </div>
            <div className="mb-4">
              <h2 className="text-md font-semibold">Topic Tags:</h2>
              <ul className="flex flex-wrap gap-2">
                {question.topicTags.map(tag => (
                  <li key={tag} className="bg-blue-200 cursor-pointer text-blue-800 px-2 py-1 rounded text-sm">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-md font-semibold">Similar Questions:</h2>
              <ul className="list-disc pl-5 text-sm">
                {question.similarQuestions.map(similar => (
                  <li key={similar.titleSlug}>
                    <a
                      href={`https://leetcode.com/problems/${similar.titleSlug}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {similar.title} - {similar.difficulty}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <a
                href={question.link}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on LeetCode
              </a>
            </div>
          </div>
        ) : (
          isFirstTime && (
            <div className="text-center text-gray-400 p-4">
              Practice questions with your peers.
            </div>
          )
        )}
      </div>
      <div
        onClick={getAnotherQuestion}
        className="flex items-center justify-center cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] text-white px-4 py-2 transition-all mt-4"
      >
        {isFirstTime ? 'Get a New Question' : 'Get Another Question'}
      </div>
    </div>
  );
};

export default RecommendedQuestions;
