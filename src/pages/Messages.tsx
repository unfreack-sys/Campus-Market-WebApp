// src/pages/Messages.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface Conversation {
  id: string;
  otherUser: string;
  productTitle: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export function Messages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    const q = query(collection(db, 'conversations'), where('participants', 'array-contains', user.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Conversation));
      setConversations(convs);
    });

    return () => unsubscribe();
  }, [user?.id]);

  return <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>
        <div className="p-4">
          {conversations.length === 0 ? <div className="text-center py-16">
              <MessageCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No messages yet
              </h2>
              <p className="text-gray-600">
                Start a conversation by contacting a seller
              </p>
            </div> : <div className="space-y-2">
              {conversations.map(conversation => <button key={conversation.id} onClick={() => navigate(`/conversation/${conversation.id}`)} className="w-full bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {conversation.otherUser}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {conversation.productTitle}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-1">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread && <div className="mt-2">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    </div>}
                </button>)}
            </div>}
        </div>
      </div>
    </div>;
}