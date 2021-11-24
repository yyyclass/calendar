import {takeEvery} from 'redux-saga/effects'
import {actionSetTheme} from "../actions/theme";

function* themeSaga() {
    // 监听触发的action
    yield takeEvery(actionSetTheme().type, setTheme)
}


function* setTheme(e) {
    document.documentElement.setAttribute("class", e.payload.data);
    localStorage.setItem("theme", e.payload.data);
}


export {
    themeSaga
}