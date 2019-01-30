import axios from 'axios';

export default function Api(dispatch, types, config, onSuccess, onError) {
    const [requestType, successType, errorType] = types;
    //Dispatch BEGIN action
    dispatch({type: requestType});

    axios(config).then(response => {
        //Dispatch SUCCESS action
        dispatch({
            type: successType,
            payload: response.data
        });

        if(typeof onSuccess === 'function') onSuccess(response);

    }).catch(error => {
        //Dispatch ERROR action
        dispatch({
            type: errorType,
            payload: error
        });

        if(typeof onError === 'function') onError(error);
    });
};