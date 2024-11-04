import React, { useState } from 'react';

const Try = () => {
  const [response, setResponse] = useState([]);
  const [userInput, setUserInput] = useState('');
  const apiKey = 'KCTyBBw8.KRL5157ihJZhvWM7qRtm9SAcgJePtNQ5';

  const fetchData = async () => {
    const url = 'https://payload.vextapp.com/hook/P3E539DBPA/catch/$(raomubasher0055)';

    const headers = {
      'Content-Type': 'application/json',
      'Apikey': `Api-Key ${apiKey}`,
    };

    const data = {
      payload: userInput,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const result = await response.json();
      

      setResponse((prev) => [...prev, { type: 'bot', text: result.text }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setResponse((prev) => [...prev, { type: 'user', text: userInput }]);
      fetchData();
      setUserInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Chatbot</h1>
        <div className="flex flex-col space-y-4 h-64 overflow-y-auto mb-4">
          {response.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Try;
