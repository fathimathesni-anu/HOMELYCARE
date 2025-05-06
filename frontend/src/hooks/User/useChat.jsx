
import { useState, useEffect } from 'react';
import axiosinstance from '../../api/axiosInstance';  // Import your axios instance for API requests

const useChat = () => {
  const [chats, setChats] = useState([]);  // All chat messages
  const [selectedChat, setSelectedChat] = useState(null);  // The chat you are currently viewing
  const [message, setMessage] = useState('');  // The message input

  const user = JSON.parse(localStorage.getItem('user'));  // Get the current user from localStorage
  const userId = user?._id;  // Extract user ID

  // Fetch all chats on mount or when the userId changes
  useEffect(() => {
    if (!userId) {
      console.error('No user logged in');
      setChats([]);
      return;
    }

    const fetchChats = async () => {
      try {
        const response = await axiosinstance.get('/chat', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const rawMessages = response.data;

        // Group chats by the receiver (the other user)
        const groupedChats = {};
        rawMessages.forEach((msg) => {
          if (msg.senderId && msg.receiverId) {  // Ensure senderId and receiverId are valid
            const otherUser =
              msg.senderId._id === userId ? msg.receiverId : msg.senderId;
            const key = otherUser._id;

            if (!groupedChats[key]) {
              groupedChats[key] = {
                _id: key,
                receiverId: otherUser,
                messages: [],
              };
            }

            groupedChats[key].messages.push(msg);
          }
        });

        setChats(Object.values(groupedChats));  // Update the chats state with grouped chats
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [userId]);

  // Send a new message to the selected chat
  const sendMessage = async () => {
    if (!message.trim()) {
      alert('Message cannot be empty');
      return;
    }

    if (!selectedChat) {
      alert('Please select a user to chat with');
      return;
    }

    try {
      const payload = {
        senderId: userId,
        receiverId: selectedChat.receiverId._id,  // The user you're chatting with
        message,
      };

      const res = await axiosinstance.post('/chat/create', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const newMsg = res.data.chat;
      const otherUser = newMsg.senderId._id === userId ? newMsg.receiverId : newMsg.senderId;

      setChats((prevChats) => {
        const updated = [...prevChats];
        const existingChatIndex = updated.findIndex(chat => chat._id === otherUser._id);

        if (existingChatIndex !== -1) {
          updated[existingChatIndex].messages.push(newMsg);
        } else {
          updated.push({
            _id: otherUser._id,
            receiverId: otherUser,
            messages: [newMsg],
          });
        }

        return updated;
      });

      setMessage('');  // Clear the message input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    chats,
    selectedChat,
    setSelectedChat,
    message,
    setMessage,
    sendMessage,
    userId,
  };
};

export default useChat;












