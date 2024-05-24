"use client";

import { fetchWebdevQuestionGroq } from '@/actions/groq.actions';
import React, { useState } from 'react';
import { marked } from 'marked';

const WebdevQuestions = () => {
  const [question, setQuestion] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetchWebdevQuestionGroq();
      setQuestion(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 overflow-y-auto custom-scrollbar pb-20">
      <button
        className={`bg-gray-900 hover:bg-gray-600 transition-all text-white font-bold py-2 px-6 rounded-full w-full mb-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get New Question'}
      </button>
      {question && (
        <div className="rounded-md overflow-y-auto custom-scrollbar shadow-md">
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: marked(question) }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default WebdevQuestions;
