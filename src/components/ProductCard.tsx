import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  condition: string;
  location: string;
}
interface ProductCardProps {
  product: Product;
}
export function ProductCard({
  product
}: ProductCardProps) {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const handleContactSeller = () => {
    const conversationId = `conv_${product.id}_${user?.id}`;
    // Create or update conversation in localStorage
    const conversationKey = `conversation_${conversationId}`;
    const existing = localStorage.getItem(conversationKey);
    if (!existing) {
      localStorage.setItem(conversationKey, JSON.stringify({
        messages: [{
          id: `msg_${Date.now()}`,
          senderId: 'system',
          text: `Hi! I'm interested in "${product.title}"`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }],
        otherUser: product.seller,
        productTitle: product.title
      }));
      // Add to user's conversations list
      const conversationsKey = `conversations_${user?.id}`;
      const conversations = JSON.parse(localStorage.getItem(conversationsKey) || '[]');
      conversations.push({
        id: conversationId,
        otherUser: product.seller,
        productTitle: product.title,
        lastMessage: `Hi! I'm interested in "${product.title}"`,
        timestamp: 'Just now',
        unread: false
      });
      localStorage.setItem(conversationsKey, JSON.stringify(conversations));
    }
    navigate(`/conversation/${conversationId}`);
  };
  return <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {product.title}
          </h3>
        </div>
        <p className="text-2xl font-bold text-blue-600 mb-3">
          ${product.price}
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserIcon className="w-4 h-4" />
            <span>{product.seller}</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
              {product.condition}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
        </div>
        <button onClick={handleContactSeller} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Contact Seller
        </button>
      </div>
    </div>;
}