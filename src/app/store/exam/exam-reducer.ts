import { createReducer, on } from "@ngrx/store";
import { ExamStates } from "./exam-states";
import { resetExamState, toggleModal, updateStatus } from "./exam-actions";

export const initialState :ExamStates = {
    state: 'instructions',
    isExamOpen: false
}

export const examReducer = createReducer(
    initialState,

    on(toggleModal , (state)=> ({
        ...state,
        isExamOpen: !state.isExamOpen
    })),

    on(updateStatus , (state , status)=>({
        ...state,
        state: status.state
    })),

    on(resetExamState , ()=> initialState),
)