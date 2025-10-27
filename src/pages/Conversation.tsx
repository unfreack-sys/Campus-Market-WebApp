// src/pages/Conversation.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeftIcon, SendIcon } from 'lucide-react';
import { doc, onSnapshot, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export function Conversation() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId || !user?.id) return;

    const docRef = doc(db, 'conversations', conversationId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMessages(data.messages || []);
        setOtherUser(data.otherUser);
        setProductTitle(data.productTitle);
      }
    });

    return () => unsubscribe();
  }, [conversationId, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !user?.id) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const docRef = doc(db, 'conversations', conversationId);
    await updateDoc(docRef, {
      messages: arrayUnion(message),
      lastMessage: message.text,
      timestamp: message.timestamp,
    });

    setNewMessage('');
  };

  return <div className="w-full h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/messages')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">{otherUser}</h2>
            <p className="text-sm text-gray-600">{productTitle}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.map(message => {
            const isCurrentUser = message.senderId === user?.id;
            return <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`}>
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>;
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button type="submit" disabled={!newMessage.trim()} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>;
}