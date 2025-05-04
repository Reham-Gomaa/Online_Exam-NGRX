import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuestionState } from "./question-state";

export const questionStateSelector = createFeatureSelector<QuestionState>('question');

export const questionsSelector = createSelector(
    questionStateSelector,
    (state)=> state.questions
);

export const selectNumberOfQuestions = createSelector(
    questionStateSelector,
    (state)=> state.numberOfQuestions
);

export const selectCurrentQuestion = createSelector(
    questionStateSelector,
    (state)=> state.currentQuestion
);