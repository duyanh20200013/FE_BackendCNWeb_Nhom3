import { useMemo } from 'react';

function Avatar({ firstName, image }) {
  const firstLetter = useMemo(() => {
    return firstName.charAt(0);
  }, [firstName]);

  return image ? (
    <div className="avatar">
      <div className="w-8 rounded-full">
        <img src={image} />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
        <span className="text-sm">{firstLetter}</span>
      </div>
    </div>
  );
}

export default Avatar;
