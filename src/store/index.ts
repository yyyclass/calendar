import {createStore, applyMiddleware} from 'redux';
import isClient from '../utils/isClient';
import rootReducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootSagaTask, sagaMiddleware} from "./saga";

let store;

function create(initialState) {
    store = createStore(rootReducers, initialState, process.env.NODE_ENV !== 'production' ? composeWithDevTools(
        applyMiddleware(
            sagaMiddleware, // saga中间件
        )
    ) : applyMiddleware(
        sagaMiddleware
    ));

    // sagaMiddleware run sagaTask
    sagaMiddleware.run(rootSagaTask);

    return store;
}

function makeStore(initialState) {
    if (isClient()) {
        if (!store) {
            return create(initialState);
        }
        return store;
    }
    return create(initialState);
}

export {
    makeStore
}
