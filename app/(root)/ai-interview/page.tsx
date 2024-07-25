"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Camera } from 'lucide-react';
import { transcribeAudioAndGetFeedback } from '@/actions/groq.actions';
import { motion, AnimatePresence } from 'framer-motion';

type Domain = 'DSA' | 'WebDev' | '';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface InterviewState {
    isRecording: boolean;
    transcript: string;
    interviewFeedback: string;
    selectedDomain: Domain;
    interviewStarted: boolean;
    isProcessing: boolean;
    error: string | null;
    conversationHistory: Message[];
}

const AiInterview: React.FC = () => {
    const [state, setState] = useState<InterviewState>({
        isRecording: false,
        transcript: '',
        interviewFeedback: '',
        selectedDomain: '',
        interviewStarted: false,
        isProcessing: false,
        error: null,
        conversationHistory: [],
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state.interviewStarted) {
            initializeMediaDevices();
        }
        return () => {
            cleanupMediaDevices();
        };
    }, [state.interviewStarted]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [state.conversationHistory]);

    const initializeMediaDevices = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = handleAudioStop;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            setState(prev => ({ ...prev, error: 'Failed to access camera or microphone. Please check your permissions.' }));
        }
    };

    const cleanupMediaDevices = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    const startInterview = () => {
        if (state.selectedDomain) {
            const initialMessage: Message = { role: 'ai', content: "Hello! Let's start the interview. Can you please introduce yourself?" };
            setState(prev => ({
                ...prev,
                interviewStarted: true,
                // interviewFeedback: ,
                error: null,
                conversationHistory: [initialMessage]
            }));
        } else {
            setState(prev => ({ ...prev, error: "Please select a domain before starting the interview." }));
        }
    };

    const startRecording = () => {
        if (mediaRecorderRef.current) {
            audioChunksRef.current = [];
            mediaRecorderRef.current.start();
            setState(prev => ({ ...prev, isRecording: true, error: null }));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && state.isRecording) {
            mediaRecorderRef.current.stop();
            setState(prev => ({ ...prev, isRecording: false, isProcessing: true, error: null }));
        }
    };

    const handleAudioStop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

        try {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async function () {
                const base64Audio = reader.result as string;
                const base64AudioContent = base64Audio.split(',')[1];

                const { transcript, feedback } = await transcribeAudioAndGetFeedback(base64AudioContent, state.selectedDomain);

                setState(prev => {
                    const updatedHistory = [
                        ...prev.conversationHistory,
                        { role: 'user' as 'user', content: transcript },
                        { role: 'ai' as 'ai', content: feedback }
                    ];
                    return {
                        ...prev,
                        transcript,
                        // interviewFeedback: feedback,
                        isProcessing: false,
                        error: null,
                        conversationHistory: updatedHistory
                    };
                });
            }
        } catch (error) {
            console.error('Error processing interview response:', error);
            setState(prev => ({
                ...prev,
                isProcessing: false,
                error: (error as Error).message || 'An unexpected error occurred. Please try again.'
            }));
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-gray-100">
            <h1 className="text-2xl font-bold p-4">AI Interview</h1>
            <AnimatePresence>
                {state.error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-4"
                        role="alert"
                    >
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{state.error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            {!state.interviewStarted ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow flex flex-col justify-center items-center p-4"
                >
                    <select
                        value={state.selectedDomain}
                        onChange={(e) => setState(prev => ({ ...prev, selectedDomain: e.target.value as Domain, error: null }))}
                        className="w-full max-w-md p-2 mb-4 border rounded"
                    >
                        <option value="">Select Domain</option>
                        <option value="DSA">Data Structures and Algorithms</option>
                        <option value="WebDev">Web Development</option>
                    </select>
                    <Button onClick={startInterview} className="w-full max-w-md">
                        Start Interview
                    </Button>
                </motion.div>
            ) : (
                <div className="flex-grow flex overflow-hidden">
                    <div className="w-1/2 flex flex-col p-4 overflow-hidden">
                        <div className="h-1/2 mb-2">
                            <video ref={videoRef} autoPlay muted className="w-full h-full bg-black rounded-lg object-cover"></video>
                        </div>
                        <div className="h-1/2 mt-2 bg-white rounded-lg p-4 shadow-inner overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-2">Feedback and Ratings</h2>
                            <p>{state.interviewFeedback || 'Feedback and ratings will be displayed here after the interview.'}</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col p-4 overflow-hidden">
                        <div ref={chatContainerRef} className="flex-grow bg-white rounded-lg p-4 shadow-inner overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-2">Conversation</h2>
                            <AnimatePresence>
                                {state.conversationHistory.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`mb-2 p-2 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}
                                    >
                                        <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong> {message.content}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="mt-4">
                            <Button
                                onClick={state.isRecording ? stopRecording : startRecording}
                                disabled={state.isProcessing}
                                className={`w-full transition-all text-white duration-300 ${state.isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                            >
                                {state.isRecording ? <Camera className="mr-2" /> : <Mic className="mr-2" />}
                                {state.isRecording ? 'Stop' : 'Start'} Recording
                            </Button>
                        </div>
                        {state.isProcessing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-gray-600 mt-2"
                            >
                                Processing your response...
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AiInterview;