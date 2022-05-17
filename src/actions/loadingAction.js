import {LOADING, SUCCESS} from './loadingTypes';

export const loadingAction = (property) => ({
    type: LOADING,
    payload: {}
});

export const successAction = (property) => ({
    type: SUCCESS,
    payload: {}
})