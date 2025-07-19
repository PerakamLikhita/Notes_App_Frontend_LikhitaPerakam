import React from 'react';

const FilterTags = ({ tags, activeTag, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className={`px-3 py-1 rounded-full border text-sm transition ${
          activeTag === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-blue-50'
        }`}
        onClick={() => onChange('all')}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`px-3 py-1 rounded-full border text-sm  transition ${
            activeTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-blue-50'
          }`}
          onClick={() => onChange(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;