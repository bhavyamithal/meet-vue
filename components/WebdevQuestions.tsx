"use client";

import { fetchWebdevQuestionGroq } from '@/actions/groq.actions';
import React, { useState } from 'react';
import { marked } from 'marked';

const WebdevQuestions = () => {
  const [question, setQuestion] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the fetching of a new question
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetchWebdevQuestionGroq();
      setQuestion(response);
    } catch (e) {
      console.error('Error fetching question:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto h-full text-white overflow-y-auto custom-scrollbar pb-24">
      <button
        className={`bg-gray-900 hover:bg-gray-600 font-bold py-2 px-6 rounded-full w-full mb-6 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get New Question'}
      </button>
      {question && (
        <div className="rounded-md overflow-y-auto custom-scrollbar shadow-md">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: marked(question) }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default WebdevQuestions;
