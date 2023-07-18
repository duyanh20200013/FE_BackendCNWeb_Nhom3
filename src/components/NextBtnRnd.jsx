import { AiFillRightCircle } from 'react-icons/ai';

function defaultFunction() {}

function NextBtnRnd({ onClick = defaultFunction }) {
  return (
    <button type="button" onClick={onClick}>
      <AiFillRightCircle className="fill-white/90 text-black hover:fill-white" size="32" />
    </button>
  );
}

export default NextBtnRnd;
