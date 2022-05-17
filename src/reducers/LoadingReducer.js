import {LOADING, SUCCESS} from '../actions/loadingTypes'

const initSate = {
    loading: false,
    payload: {},
    status: '',
}

const LoadingReducer = (state = initSate, action) => {
    switch(action.type){
        case LOADING:
            return {
                ...state,
                status: 'loading',
                loading: true,
                payload: action.payload
            }
        case SUCCESS:
            return {
                ...state,
                status: 'success',
                loading: false,
                payload: action.payload
            }
        default:
            return initSate;
    };
};

export default LoadingReducer;