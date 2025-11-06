import React from "react";

const ChatbotPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Chatbot</h1>
      <div className="bg-white border rounded-lg shadow p-4 flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto border rounded p-3 text-sm text-gray-600 bg-gray-50">
          This is where your AI assistant chat will appear.
        </div>
        <div className="mt-3">
          <form className="flex gap-2">
            <input className="flex-1 border rounded px-3 py-2" placeholder="Type a message..." />
            <button className="px-4 py-2 bg-black text-white rounded" type="button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;

