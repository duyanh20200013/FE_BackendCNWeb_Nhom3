import ReviewCard from './ReviewCard';
import ModalWrapper from '../../../components/auth/components/ModalWrapper';

function ReviewModal({ isShow = false, handleClose = () => { }, data1 }) {
    return (
        isShow && (
            <ModalWrapper handleClose={handleClose}>
                <ReviewCard onClose={handleClose} data1={data1} />
            </ModalWrapper>
        )
    );
}

export default ReviewModal;