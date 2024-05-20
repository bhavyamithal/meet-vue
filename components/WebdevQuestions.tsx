import { fetchWebdevQuestionReplicate } from '@/actions/replicate.actions';
import { formatQuestionResponse } from '@/lib/utils';
import React, { useState } from 'react';

// Utility function to extract question and hint from the response string


const WebdevQuestions = () => {
  const [question, setQuestion] = useState<string | undefined>();
  const [hint, setHint] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const fetchedQuestion = await fetchWebdevQuestionReplicate();
      // @ts-ignore
      const { question, hint } = formatQuestionResponse(fetchedQuestion);
      setQuestion(question);
      setHint(hint);
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
      {question && hint && (
        <div className="rounded-md overflow-y-auto custom-scrollbar">
          <p className="text-base mb-4"><span className="font-bold text-blue-600">Question:</span> {question}</p>
          <p className="mb-4"><span className="font-bold text-blue-600">Hint:</span> {hint}</p>
        </div>
      )}
    </div>
  );
};

export default WebdevQuestions;
