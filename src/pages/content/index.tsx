import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const App = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    const handleAIButtonClick = () => {
        setShowPrompt(true);
    };

    const handleCloseButtonClick = () => {
        setShowPrompt(false);
        setPrompt('');
        setResponse('');
        setLoading(false);
    };

    const handleSendButtonClick = async (prompt: string) => {
        setLoading(true);
        try {
            const completion = await openai.chat.completions.create({
                messages: [{role: "system", content: prompt}],
                model: "gpt-4o-mini",
            });

            setResponse(completion.choices[0].message.content ?? '');
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Tab' && response) {
            e.preventDefault();
            setPrompt(prevPrompt => prevPrompt + response);
            setResponse('');
        }
    };

    return (
        <div className='absolute bottom-0 left-0 text-lg text-black z-50'>
            {!showPrompt && (
                <button
                    onClick={handleAIButtonClick}
                    className='text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-4'
                >
                    ✨ AI
                </button>
            )}
            {showPrompt && (
                <div>
                    <div
                        id='message'
                        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        contentEditable
                        onInput={(e) => setPrompt(e.currentTarget.textContent || '')}
                        onKeyDown={handleKeyDown}
                        ref={divRef}
                    >
                        {prompt}
                        <span className='text-gray-500'>{response}</span>
                    </div>
                    <button
                        onClick={() => handleSendButtonClick(prompt)}
                        type="button"
                        className={`focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${loading ? 'cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg aria-hidden="true" role="status"
                                     className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#1C64F2"/>
                                </svg>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                Generate response
                            </div>
                        )}
                    </button>
                    <button
                        onClick={handleCloseButtonClick}
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

const div = document.createElement('div');
div.id = '__root';
document.body.appendChild(div);

const rootContainer = document.querySelector('#__root');
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(<App/>);
