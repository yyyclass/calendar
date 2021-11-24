import {IActionThemeCommon} from "../../actions/theme";

type IStoreThemeState = 'light' | 'dark'

const initialState: IStoreThemeState = 'light'; // 初始化状态
const themeReducer = (state: IStoreThemeState = initialState, action: IActionThemeCommon) => {
    switch (action.type) {
        case "SET_THEME":
            return action.payload.data;
        default:
            return state;
    }
}
export type{
    IStoreThemeState
}
export default themeReducer;