import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from '../constants';

const initialState = {
    open: false,
    activeModal: null,
    title: null,
};

function modal(state = initialState, action) {
    const { type, open, activeModal } = action;

    if (type === OPEN_MODAL) {
        return {
            activeModal,
            open: true,
        };
    } else {
        return initialState;
    }
}

export default modal;