import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance'
import Toast from '../../components/ToastMessage/Toast'
import FilterTags from '../../components/FilterTags'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });

  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: noteDetails
    });
  }

  const ShowToastMsg = ({ message, type }) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',
    });
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data && Array.isArray(response.data.notes)) {
        const allNotes = response.data.notes;
        setNotes(allNotes);

        const uniqueTags = Array.from(
          new Set(allNotes.flatMap((note) => note.tags || []))
        );
        setAvailableTags(uniqueTags);
      } else {
        setNotes([]);
        setAvailableTags([]);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        ShowToastMsg({ message: "Note Deleted Successfully", type: "delete" });
        getNotes();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  }

  

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteId}`, {
        isPinned: !noteData.isPinned
      });
      if (response.data && response.data.note) {
        getNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
    getNotes();
    return () => { };
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo}  />

      {availableTags.length > 0 && (
        <div className='container px-4 mx-auto mt-4'>
          <FilterTags
            tags={availableTags}
            activeTag={selectedTag}
            onChange={setSelectedTag}
          />
        </div>
      )}

      <div className='container px-4 mx-auto'>
        {loading ? (
          <div className='mt-8 text-center text-lg font-medium text-blue-600'>Loading your notes...</div>
        ) : error ? (
          <div className='mt-8 text-center text-red-500'>{error}</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {notes.filter(note =>
              selectedTag === 'all' || (note.tags || []).includes(selectedTag)
            ).length > 0 ? (
              notes
                .filter(note =>
                  selectedTag === 'all' || (note.tags || []).includes(selectedTag)
                )
                .map(note => (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    date={note.date}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.isPinned}
                    onEdit={() => handleEdit(note)}
                    onDelete={() => deleteNote(note)}
                    onPinNote={() => updateIsPinned(note)}
                  />
                ))
            ) : (
              <div className='col-span-full text-center text-gray-500 mt-4 text-md'>
                {isSearch ? (
                  <p>No notes matched your search.</p>
                ) : (
                  <p>
                    You don't have any notes yet. <br />
                    Click the <strong>+</strong> button below to start creating!
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <button className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-md bg-blue-600 hover:bg-blue-700 text-white bottom-8 right-8 transition-colors duration-300"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: 'add',
            data: null
          });
        }}>
        <MdAdd className='text-[28px]' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
        contentLabel="Note Modal"
        className="w-[90%] md:w-[40%] max-h-[80vh] bg-white rounded-xl mx-auto mt-14 p-6 overflow-auto shadow-lg"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: 'add',
              data: null
            });
          }}
          getNotes={getNotes}
          showToastMsg={ShowToastMsg}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home;
