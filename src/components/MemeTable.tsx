import { useState } from 'react';
import Modal from './Modal';
import { server_calls } from '../api/server';
import MemeForm from './Memeform';

interface CustomImageData {
    id: string;
    img: string;
    title: string;
    isStatic?: boolean;
  }
  
  interface MemeTableProps {
    selectedImage: number | null;
    imageData: CustomImageData[];
    onImageUpload: () => void;
    onUpdate: (imageId: string, updatedData: any) => void;
    onDelete: (imageId: string) => void;
  }
  
  const MemeTable: React.FC<MemeTableProps> = ({
    selectedImage,
    imageData,
    onImageUpload,
    onUpdate,
    onDelete,
  }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newFilename, setNewFilename ] = useState('');

  const handleUpdate = () => {
    if (selectedImage !== null && imageData && imageData[selectedImage]) {
        const selectedImg = imageData[selectedImage];
        if (selectedImg.isStatic) {
            alert('Cannot update a static image.');
        } else {
            const imageId = selectedImg.id;
            const updatedData ={
                filename:  newFilename,
            };
            console.log('Updated filename:', newFilename)
            onUpdate( imageId, updatedData);
            setNewFilename('');
        }
    }
  };

  const handleDelete = () => {
    if (selectedImage !== null && imageData && imageData[selectedImage]) {
      const selectedImg = imageData[selectedImage];
      if (selectedImg.isStatic) {
        alert('Cannot delete a static image.');
      } else {
        const imageId = selectedImg.id;
        onDelete(imageId);
      }
    }
  };

  const getData = async () => {
    const result = await server_calls.get();
    console.log(result);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <MemeForm onClose={handleClose} onImageUpload={onImageUpload} />
      </Modal>
      <div className="sticky top-0 bg-white p-4 shadow-md z-10">
        <div className="flex flex-row">
          <div>
            <button
              className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
              onClick={handleOpen}
            >
              Create your own Meme
            </button>
          </div>
          {selectedImage !== null && (
        <>
        <input
            type='text'
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
            placeholder = 'New filename' 
            />
          <button
            className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      )}
          <button onClick={getData}>Get Data</button>
        </div>
      </div>
    </>
  );
};

export default MemeTable;