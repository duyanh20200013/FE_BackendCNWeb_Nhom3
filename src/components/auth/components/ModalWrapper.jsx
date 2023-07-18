import useOutsideClick from '/src/hooks/useOutsideClick';

function ModalWrapper({ children, className, handleClose = () => {} }) {
  const modalRef = useOutsideClick(handleClose);

  return (
    <div
      className={`fixed p-4 top-0 left-0 right-0 z-[999] w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full h-full bg-[rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="flex justify-center">
        {/* Modal content */}
        <div ref={modalRef}>{children}</div>
      </div>
    </div>
  );
}

export default ModalWrapper;
