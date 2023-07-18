import { AiFillLeftCircle } from 'react-icons/ai';

function defaultFunction() {}

function PrevBtnRnd({ onClick = defaultFunction }) {
  return (
    <button type="button" onClick={onClick}>
      <AiFillLeftCircle className="fill-white/90 text-black hover:fill-white" size="32" />
    </button>
  );
}

export default PrevBtnRnd;
