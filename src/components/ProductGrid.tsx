import React from 'react';
import { ProductCard } from './ProductCard';
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
interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
}
const mockProducts: Product[] = [{
  id: '1',
  title: 'Calculus Early Transcendentals (9th Edition)',
  price: 45,
  image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
  category: 'textbooks',
  seller: 'Sarah M.',
  condition: 'Like New',
  location: 'North Campus'
}, {
  id: '2',
  title: 'MacBook Pro 13" 2020',
  price: 850,
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
  category: 'electronics',
  seller: 'John D.',
  condition: 'Good',
  location: 'West Dorms'
}, {
  id: '3',
  title: 'IKEA Desk with Drawers',
  price: 75,
  image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
  category: 'furniture',
  seller: 'Mike R.',
  condition: 'Used',
  location: 'South Campus'
}, {
  id: '4',
  title: 'North Face Winter Jacket',
  price: 60,
  image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
  category: 'clothing',
  seller: 'Emma L.',
  condition: 'Like New',
  location: 'East Dorms'
}, {
  id: '5',
  title: 'Mountain Bike - Trek Marlin 5',
  price: 320,
  image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=400&fit=crop',
  category: 'bikes',
  seller: 'Alex P.',
  condition: 'Good',
  location: 'North Campus'
}, {
  id: '6',
  title: 'Introduction to Psychology Textbook',
  price: 35,
  image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop',
  category: 'textbooks',
  seller: 'Lisa K.',
  condition: 'Used',
  location: 'Library Area'
}, {
  id: '7',
  title: 'iPad Air 2022 with Apple Pencil',
  price: 450,
  image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
  category: 'electronics',
  seller: 'David W.',
  condition: 'Like New',
  location: 'West Campus'
}, {
  id: '8',
  title: 'Comfortable Study Chair',
  price: 40,
  image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
  category: 'furniture',
  seller: 'Rachel T.',
  condition: 'Good',
  location: 'East Dorms'
}];
export function ProductGrid({
  selectedCategory,
  searchQuery
}: ProductGridProps) {
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'item' : 'items'} available
        </p>
      </div>
      {filteredProducts.length === 0 ? <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found</p>
          <p className="text-gray-400 mt-2">
            Try adjusting your filters or search query
          </p>
        </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>}
    </div>;
}