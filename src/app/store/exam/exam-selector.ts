import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExamStates } from "./exam-states";

export const selectExamState = createFeatureSelector<ExamStates>('exam');

export const selectExamModal = createSelector(
    selectExamState,
    (state)=> state.isExamOpen
);

export const selectStatus = createSelector(
    selectExamState,
    (state)=> state.state
)