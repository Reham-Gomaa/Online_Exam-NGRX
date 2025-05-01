import { createReducer, on } from "@ngrx/store";
import { assign } from "./token.action";
import { Payload } from "../../core/interfaces/itoken";

export let initialState: Payload = {
    // Provide valid initial values for the properties of IToken
     iat: 0,
     id: '',
     role: ''
    };


export const tokenReducer = createReducer(
    initialState,
    on(assign , (state , action) => state = action.value )
)