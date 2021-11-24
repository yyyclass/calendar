import {TActionUserCommon} from "../../actions/user";
import {ReducerAction} from "react";

interface IStoreUserState {
    data: null | any;
    isLoading: boolean;

}

const initialState: IStoreUserState = {
    data: null,
    isLoading: false
}

const userReducer= (state = initialState, action:TActionUserCommon) => {
    switch (action.type) {
        case "ACTION_USER_SET":
            return {
                ...state,
                ...action.payload.data
            }
        default:
            return state
    }
}

export type{
    IStoreUserState,
}

export default userReducer;