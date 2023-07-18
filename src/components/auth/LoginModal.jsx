import LoginCard from './LoginCard';
import ModalWrapper from './components/ModalWrapper';

function LoginModal({ isShow = false, handleClose = () => {} }) {
  return (
    isShow && (
      <ModalWrapper handleClose={handleClose}>
        <LoginCard onClose={handleClose} />
      </ModalWrapper>
    )
  );
}

export default LoginModal;
