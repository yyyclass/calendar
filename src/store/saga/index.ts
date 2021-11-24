import createSagaMiddleware from 'redux-saga';
import {themeSaga} from './theme.saga'
import {all} from 'redux-saga/effects';


export function* rootSagaTask() {
    yield all([themeSaga()])
}

export const sagaMiddleware = createSagaMiddleware(); // 创建一个saga root中间件