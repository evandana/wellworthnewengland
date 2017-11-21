import { connect } from 'react-redux';
import Modal from '../../../view/Common/Modal';
import LoginController from 'components/controller/Common/Modal/Login';
import PendingUserController from 'components/controller/Common/Modal/PendingUser';

const mapStateToProps = (state) => {
    let { open, activeModal, title, ModalComponent } = state.modal;
    const { authInitiated, permissions } = state.user;
    
    if (!permissions.basic && authInitiated) {
        open = true;
        title = 'LOGIN';
        ModalComponent = LoginController;
    } else if (!permissions.products && authInitiated) {
        open = true;
        title = 'PENDING CUSTOMER';
        ModalComponent = PendingUserController;
    } else {
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