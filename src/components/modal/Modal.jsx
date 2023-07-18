import { IoMdClose } from 'react-icons/io';
import useOutsideClick from '@/hooks/useOutsideClick';

// Action: Action Section
function Modal({ open, title, onClose = () => {}, children, action }) {
  const Action = action;

  let modalRef = useOutsideClick(onClose);

  return (
    <div
      className={`fixed p-4 sm:p-10 top-0 left-0 right-0 z-[999] w-full overflow-x-hidden md:inset-0 h-full bg-[rgba(0,0,0,0.5)]  justify-center items-center ${
        open ? 'flex' : 'hidden'
      }`}
    >
      {/* Modal Box */}
      <div
        ref={modalRef}
        className="bg-white rounded-lg min-w-[350px] max-h-full overflow-clip flex flex-col justify-between"
      >
        {/* header */}
        <div className="h-16 min-h-16 px-4 flex items-center justify-center border-b relative">
          <button className="absolute left-4 cursor-pointer rounded-full p-1 hover:bg-neutral-100">
            <IoMdClose size={24} onClick={onClose} />
          </button>
          <h3 className="font-bold">{title}</h3>
        </div>
        <div className="overflow-y-auto">
          <div className="w-full md:w-[700px] max-w-[700px] sm: py-6 sm:px-6 min-h-[200px]">
            {children}
          </div>
        </div>
        {action && (
          <footer className="border-t px-6 py-4">
            <Action />
          </footer>
        )}
      </div>
    </div>
  );
}

export default Modal;
