import React from 'react';
import { BookOpenIcon, LaptopIcon, ArmchairIcon, ShirtIcon, BikeIcon, MoreHorizontalIcon } from 'lucide-react';
interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}
const categories = [{
  id: 'all',
  label: 'All Items',
  icon: MoreHorizontalIcon
}, {
  id: 'textbooks',
  label: 'Textbooks',
  icon: BookOpenIcon
}, {
  id: 'electronics',
  label: 'Electronics',
  icon: LaptopIcon
}, {
  id: 'furniture',
  label: 'Furniture',
  icon: ArmchairIcon
}, {
  id: 'clothing',
  label: 'Clothing',
  icon: ShirtIcon
}, {
  id: 'bikes',
  label: 'Bikes',
  icon: BikeIcon
}];
export function CategoryFilter({
  selectedCategory,
  setSelectedCategory
}: CategoryFilterProps) {
  return <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map(category => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
              <Icon className="w-5 h-5" />
              <span className="font-medium">{category.label}</span>
            </button>;
      })}
      </div>
    </div>;
}