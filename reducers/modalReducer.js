import {
    OPEN_SOCIAL_MODAL,
    CLOSE_SOCIAL_MODAL,
    TOGGLE_SOCIAL_MODAL
} from "../actions/modalAction";

const modalReducer = (
    state = {
        social: false
    },
    { type, payload }
) => {
    switch (type) {
        case OPEN_SOCIAL_MODAL:
            return {
                ...state,
                social: true
            };
        case CLOSE_SOCIAL_MODAL:
            return {
                ...state,
                social: false
            };
        case TOGGLE_SOCIAL_MODAL:
            return {
                ...state,
                social: !state.social
            };
        default:
            return state;
    }
};

export default modalReducer;
