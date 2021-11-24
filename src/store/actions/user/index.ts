import {IActionCommon} from "../../interface/IActionCommon";
import {IStoreUserState} from "../../reducers/user";

type TActionUserSetReturn = IActionCommon<"ACTION_USER_SET", IStoreUserState>
type TActionUserLogoutReturn = IActionCommon<"ACTION_USER_LOGOUT", { data: null, isLoading: boolean }>
type TActionUserCommon = TActionUserSetReturn;

const actionUserSet = (data: IStoreUserState): TActionUserSetReturn => {
    return {
        type: "ACTION_USER_SET",
        payload: {
            data,
            text: "设置用户"
        }
    }
}


const actionUserLogout = (): TActionUserLogoutReturn => {
    return {
        type: "ACTION_USER_LOGOUT",
        payload: {
            data: {
                data: null,
                isLoading: false
            },
            text: "设置用户"
        }
    }
}


export type {
    TActionUserSetReturn,
    TActionUserCommon,
}

export {
    actionUserSet
}