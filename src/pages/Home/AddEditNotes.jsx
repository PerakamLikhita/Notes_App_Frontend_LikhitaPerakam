import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from '../../components/input/TagInput'
import axiosInstance from '../../utils/axiosinstance'

const AddEditNotes = ({ noteData, type, getNotes, onClose, showToastMsg }) => {
  const [title, setTitle] = useState(noteData?.title || '')
  const [content, setContent] = useState(noteData?.content || '')
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post('/add-note', {
        title,
        content,
        tags: [...new Set(tags)],
      })
      if (response.data?.note) {
        showToastMsg({ message: "Note Added Successfully", type: "add" })
        getNotes()
        onClose()
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add note")
    }
  }

  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags: [...new Set(tags)],
      })
      if (response.data?.note) {
        showToastMsg({ message: "Note Updated Successfully", type: "edit" })
        getNotes()
        onClose()
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update note")
    }
  }

  const handleAddNote = () => {
    if (!title) return setError("Please enter the title")
    if (!content) return setError("Please enter the content")
    setError("")
    type === 'edit' ? editNote() : addNewNote()
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40">
      <div className="w-[92vw] h-[92vh] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 rounded-full hover:bg-gray-100 p-1 z-10"
          onClick={onClose}
        >
          <MdClose className="text-2xl text-slate-600" />
        </button>

        {/* Content Section */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 pt-14 overflow-hidden">
          {/* Left: Title and Content */}
          <div className="w-full md:w-2/3 flex flex-col">
            {/* Title */}
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-600">Title</label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-400 text-base py-1 outline-none focus:border-blue-500"
                placeholder="Enter title..."
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-600">Content</label>
              <textarea
                className="w-full h-full resize-none border border-gray-400 rounded-md p-3 mt-2 outline-none text-sm focus:border-blue-500"
                placeholder="Write your note content here..."
                value={content}
                onChange={({ target }) => setContent(target.value)}
                style={{ minHeight: "calc(100% - 40px)" }}
              />
            </div>
          </div>

          {/* Right: Tags */}
          <div className="w-full md:w-1/3 flex flex-col justify-between overflow-auto">
            <div>
              <label className="text-sm font-medium text-slate-600">Tags</label>
              <TagInput
                tags={tags}
                setTags={(newTags) => setTags([...new Set(newTags)])}
              />
              {error && (
                <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Add/Update Button Full Width */}
        <div className="w-full p-4 bg-gray-100 border-t border-gray-400">
          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleAddNote}
          >
            {type === 'edit' ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditNotes
