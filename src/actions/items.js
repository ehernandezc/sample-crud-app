import Api from '../utilities/Api';

export const GET_ITEMS = {
    BEGIN: 'GET_ITEMS_BEGIN',
    SUCCESS: 'GET_ITEMS_SUCCESS',
    FAILURE: 'GET_ITEMS_FAILURE',
    INVALIDATE: 'GET_ITEMS_INVALIDATE'
};

export const GET_ITEMS_EVENTS = [
    GET_ITEMS.BEGIN,
    GET_ITEMS.SUCCESS,
    GET_ITEMS.FAILURE
];

export const CREATE_ITEM = {
    BEGIN: 'CREATE_ITEM_BEGIN',
    SUCCESS: 'CREATE_ITEM_SUCCESS',
    FAILURE: 'CREATE_ITEM_FAILURE',
};

export const CREATE_ITEM_EVENTS = [
    CREATE_ITEM.BEGIN,
    CREATE_ITEM.SUCCESS,
    CREATE_ITEM.FAILURE
];

export const DELETE_ITEM = {
    BEGIN: 'DELETE_ITEM_BEGIN',
    SUCCESS: 'DELETE_ITEM_SUCCESS',
    FAILURE: 'DELETE_ITEM_FAILURE',
};

export const DELETE_ITEM_EVENTS = [
    DELETE_ITEM.BEGIN,
    DELETE_ITEM.SUCCESS,
    DELETE_ITEM.FAILURE
];

export const UPDATE_ITEM = {
    BEGIN: 'UPDATE_ITEM_BEGIN',
    SUCCESS: 'UPDATE_ITEM_SUCCESS',
    FAILURE: 'UPDATE_ITEM_FAILURE',
};

export const UPDATE_ITEM_EVENTS = [
    UPDATE_ITEM.BEGIN,
    UPDATE_ITEM.SUCCESS,
    UPDATE_ITEM.FAILURE
];

const API_URL  = 'http://localhost/api';
const RESOURCE = 'items';

export const invalidateItems = () => {
    return dispatch => {
        dispatch({
            type: GET_ITEMS.INVALIDATE
        });
    }
};

const fetchItems = () => dispatch => {
    return Api(dispatch, GET_ITEMS_EVENTS, {
        url: `${API_URL}/${RESOURCE}`,
        method: 'GET',
    });
};

const shouldFetchItems = (state) => {
    const { items, isLoading, didInvalidate } = state.items;
    if (items.length === 0) {
        return true
    }
    if (isLoading) {
        return false
    }
    return didInvalidate
};

export const fetchItemsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchItems(getState())) {
        return dispatch(fetchItems())
    }
};

export const createItem = (data, onSuccess) => dispatch => {
    return Api(dispatch, CREATE_ITEM_EVENTS, {
        url: `${API_URL}/${RESOURCE}`,
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    }, onSuccess);
};

export const updateItem = (data, onSuccess) => dispatch => {
    return Api(dispatch, UPDATE_ITEM_EVENTS, {
        url: `${API_URL}/${RESOURCE}/${data.id}`,
        method: 'PUT',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    }, onSuccess);
};

export const deleteItem = (id) => dispatch => {
    return Api(dispatch, DELETE_ITEM_EVENTS, {
        url: `${API_URL}/${RESOURCE}/${id}`,
        method: 'DELETE'
    });
};