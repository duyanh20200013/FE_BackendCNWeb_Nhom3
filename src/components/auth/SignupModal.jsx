import SignupCard from './SignupCard';
import ModalWrapper from './components/ModalWrapper';

function SignupModal({ isShow = false, handleClose = () => {} }) {
  return (
    isShow && (
      <ModalWrapper handleClose={handleClose}>
        <SignupCard onClose={handleClose} />
      </ModalWrapper>
    )
  );
}

export default SignupModal;
