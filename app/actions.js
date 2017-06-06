import fetch from 'isomorphic-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';

function requestData() {
    return {
        type: REQUEST_DATA
    };
}

export function invalidateData() {
    return {
        type: INVALIDATE_DATA
    };
}

function receiveData(json) {
    return {
        type: RECEIVE_DATA,
        data: {
            1: json['1'],
            2: json['2'],
            3: json['3'],
            menu: json['menu'],
            tab: json['tab']
        },
        receivedAt: Date.now()
    };
}

function fetchData(menu = 'products', tab = 'general') {
    return dispatch => {
        dispatch(requestData());
        return fetch(`http://localhost:3000/${menu}/${tab}`)
            .then(response => response.json())
            .then(json => dispatch(receiveData(json)));
    };
}

function shouldFetchData(state) {
    const data = state.content.data;
    if (!Object.keys(data).length || state.content.didInvalidate) {
        return true;
    } else if (data.isFetching) {
        return false;
    }
    return false;
}

export function fetchDataIfNeeded(menu, tab) {
    return (dispatch, getState) => {
        if (shouldFetchData(getState())) {
            return dispatch(fetchData(menu, tab));
        }
    };
}
