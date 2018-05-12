import { connect } from 'react-redux';
import { ANONYMOUS, PENDING, CUSTOMER } from '../../../../constants';
import Modal from '../../../view/Common/Modal';
import LoginController from 'components/controller/Common/Modal/Login';
import PendingUserController from 'components/controller/Common/Modal/PendingUser';

const mapStateToProps = (state) => {
    let { open, activeModal, title, ModalComponent } = state.modal;
    
    if (state.user.role === ANONYMOUS) {
        open = true;
        title = 'LOGIN';
        ModalComponent = LoginController;
    } else if (state.user.role === PENDING) {
        open = true;
        title = 'PENDING CUSTOMER';
        ModalComponent = PendingUserController;
    } else if (state.user.role === CUSTOMER) {
        open = false;
    }
    
    return {
        activeModal,
        open,
        title,
        ModalComponent,
    };
};

const ModalController = connect(
    mapStateToProps, null
)(Modal);

export default ModalController;