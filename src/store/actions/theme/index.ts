import {IActionCommon} from "../../interface/IActionCommon";
import {IStoreThemeState} from "../../reducers/theme";


type IActionSetTheme = IActionCommon<"SET_THEME", IStoreThemeState>;
type IActionThemeCommon = IActionSetTheme;


/**
 * action 设置网站的主题样式
 * @param data
 */
const actionSetTheme = (data: IStoreThemeState = 'light') => {
    return {
        type: "SET_THEME",
        payload: {
            data,
            text: "设置网站样式的主题"
        }
    }
}


export type{
    IActionSetTheme,
    IActionThemeCommon
}

export {
    actionSetTheme
}