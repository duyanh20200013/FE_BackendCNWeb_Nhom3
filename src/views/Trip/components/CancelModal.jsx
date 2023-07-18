import CancelCard from './CancelCard';
import ModalWrapper from '../../../components/auth/components/ModalWrapper';

function CancelModal({ isShow = false, handleClose = () => { }, data2 }) {
    return (
        isShow && (
            <ModalWrapper handleClose={handleClose}>
                <CancelCard onClose={handleClose} data2={data2} />
            </ModalWrapper>
        )
    );
}

export default CancelModal;