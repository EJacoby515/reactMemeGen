import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed w-full h-full flex overflow-auto z-50 justify-center align-middle bg-gray-300 bg-opacity-25"
    >
      <div
        className="max-w-600px w-2/5 absolute flex z-50 mt-20 bg-white shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row space-apart">
            <p
              className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
              onClick={onClose}
            >
              X
            </p>
          </div>
          <div className="flex flex-col items-center text-center mt-3 p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;