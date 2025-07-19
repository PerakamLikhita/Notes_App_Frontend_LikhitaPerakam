import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className='p-5 bg-white border rounded-xl shadow hover:shadow-lg transition-all flex flex-col justify-between min-h-[180px]'>
      
      {/* Header: Title + Pin */}
      <div className='flex items-start justify-between'>
        <div>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          <span className='text-xs text-gray-500'>{moment(date).format('DD MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin
          className={`text-xl cursor-pointer transition ${
            isPinned ? 'text-yellow-500' : 'text-gray-300'
          } hover:text-yellow-600`}
          onClick={onPinNote}
          title={isPinned ? "Unpin" : "Pin"}
        />
      </div>

      {/* Content */}
      <p className='mt-3 text-sm text-gray-600'>{content?.slice(0, 100)}...</p>

      {/* Footer: Tags + Actions */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags */}
        <div className='flex flex-wrap gap-1 text-xs text-gray-500'>
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded-full">#{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3 text-lg'>
          <MdCreate
            className='text-gray-600 hover:text-blue-600 cursor-pointer transition'
            onClick={onEdit}
            title="Edit"
          />
          <MdDelete
            className='text-gray-600 hover:text-red-500 cursor-pointer transition'
            onClick={onDelete}
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
