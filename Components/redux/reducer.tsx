import {SET_USER_DATA } from "./CounterAction"

// const initialState: any[] = []
const initialState= {}
export const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userList: action.data
            }
        default:
            return [
                state
            ]
    }
}