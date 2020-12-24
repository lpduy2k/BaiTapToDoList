import {combineReducers,createStore} from 'redux';
import {BaiTapToDoListReducer} from './BaiTapToDoListReducer';

const rootReducer = combineReducers({
    BaiTapToDoListReducer
})

export const store = createStore(rootReducer);