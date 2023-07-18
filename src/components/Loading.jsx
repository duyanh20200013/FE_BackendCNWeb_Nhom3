function Loading() {
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 bg-black/[.4] z-[999]">
      <div className="loading-spinner">
        <svg viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    </div>
  );
}

export default Loading;
