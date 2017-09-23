import { connect } from 'react-redux';
import { ANONYMOUS } from '../../../../constants';
import Modal from '../../../view/Common/Modal';
import LoginController from 'components/controller/Common/Modal/Login';
import PendingUserController from 'components/controller/Common/Modal/PendingUser';

const mapStateToProps = (state) => {

    let { open, activeModal, title, ModalComponent } = state.modal;
    
    if (state.user.role === ANONYMOUS) {
        open = true;
        title = 'LOGIN';
        ModalComponent = LoginController;
    } else {
        open = true;
        title = 'PENDING CUSTOMER';
        ModalComponent = PendingUserController;
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