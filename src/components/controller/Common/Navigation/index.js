import { connect } from 'react-redux';
import { openModal } from '../../../../actions';
import Navigation from '../../../view/Common/Navigation';

const mapStateToProps = (state) => {

    return {
        user: state.user,
        userRole: state.user.role,
    };
};

const mapDispatchToProps = ({
    openModal,
});

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation);

export default NavigationController;