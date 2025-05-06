import React from 'react';
import useChat from '../../hooks/User/useChat';  // Import the useChat hook

const ChatPage = () => {
  const { chats, selectedChat, setSelectedChat, message, setMessage, sendMessage, userId } = useChat();

  return (
    <div className="flex h-screen">
      {/* Sidebar for chats */}
      <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <ul>
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className="cursor-pointer p-2 hover:bg-gray-100 rounded mb-2"
              >
                {chat.receiverId?.name || 'Unknown'}
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No chats available</li>
          )}
        </ul>
      </div>

      {/* Chat window for selected chat */}
      <div className="w-2/3 flex flex-col p-4">
        {selectedChat ? (
          <>
            <h2 className="text-lg font-bold mb-4 border-b pb-2">
              Chat with {selectedChat.receiverId?.name || 'Unknown'}
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {Array.isArray(selectedChat.messages) && selectedChat.messages.length > 0 ? (
                selectedChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-xs px-4 py-2 rounded-lg ${msg.senderId._id === userId
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-900 self-start mr-auto'}`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No messages yet.</p>
              )}
            </div>

            {/* Input field to type new message */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            Select a chat to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;








