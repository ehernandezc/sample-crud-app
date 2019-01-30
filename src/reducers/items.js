import { GET_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../actions/items';

const INITIAL_STATE = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    hasErrored: false
};

export const items = (state = INITIAL_STATE,  {type, payload = {}}) => {
    switch (type) {
        case GET_ITEMS.INVALIDATE:
            return {
                ...state,
                didInvalidate: true
            };
        case GET_ITEMS.BEGIN:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            };
        case GET_ITEMS.SUCCESS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: payload,
            };
        case GET_ITEMS.FAILURE:
            return {
                ...state,
                hasErrored: true
            };

        case CREATE_ITEM.BEGIN:
            return {
                ...state,
                isFetching: true
            };
        case CREATE_ITEM.SUCCESS:
            let item = [];
            item.push(payload);
            return {
                ...state,
                isFetching: false,
                items: state.items.concat(item)
            };
        case CREATE_ITEM.FAILURE:
            return {
                ...state,
                hasErrored: true
            };
//

        case UPDATE_ITEM.BEGIN:
            return {
                ...state,
                isFetching: true
            };
        case UPDATE_ITEM.SUCCESS:
            let index = state.items.findIndex(item => item.id === payload.id);
            const newState = {...state};
            newState.items[index] = payload;
            return {
                ...newState,
                isFetching: false,
                hasErrored: false
            };
        case UPDATE_ITEM.FAILURE:
            return {
                ...state,
                hasErrored: true
            };
//
        case DELETE_ITEM.BEGIN:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_ITEM.SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: state.items.filter((item) => item.id !== payload.id)
            };
        case DELETE_ITEM.FAILURE:
            return {
                ...state,
                hasErrored: true
            };

        default:
            return state
    }
};