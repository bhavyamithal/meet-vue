"use client";

import { fetchConsultingQuestionGroq } from '@/actions/groq.actions';
import { marked } from 'marked';
import React, { useState } from 'react';

const ConsultingQuestions = () => {
  const [question, setQuestion] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle fetching of a new question
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetchConsultingQuestionGroq();
      setQuestion(response);
    } catch (e) {
      console.error('Error fetching question:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 h-full overflow-y-auto custom-scrollbar pb-24">
      <button
        className={`bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full w-full mb-6 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default ConsultingQuestions;
