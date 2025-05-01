import { createReducer, on } from "@ngrx/store";
import { ExamStates } from "./exam-states";
import { toggleModal } from "./exam-actions";

export const initialState :ExamStates = {
    state: 'not started',
    isExamOpen: false
}

export const examReducer = createReducer(
    initialState,
    on(toggleModal , (state)=> ({
        ...state,
        isExamOpen: !state.isExamOpen
    }))
)