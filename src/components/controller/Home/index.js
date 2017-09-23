import { connect } from 'react-redux';
import { openModal } from '../../../actions';
import Home from '../../view/Home';

const mapStateToProps = (state) => {

    return {
        userRole: state.user.role,
    };
};

const mapDispatchToProps = { openModal };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;