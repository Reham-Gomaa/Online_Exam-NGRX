// Removed unused import for examState
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { QuestionService } from '../../features/services/Questions/question.service';
import { loadQuestions, setCurrentQuestion, setQuestions, setWrongQuestions } from './question-actions';
import { updateStatus } from '../exam/exam-actions';
import { Store } from '@ngrx/store';
import { questionsSelector, selectCurrentQuestion } from './question-selector';

@Injectable()
export class QuestionsEffects {
    private readonly actions$ = inject(Actions);
    private readonly _QuestionService = inject(QuestionService);
    private readonly _Store = inject(Store);

    loadQuestionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadQuestions),
            switchMap((action) =>
                this._QuestionService.getAllQuestionsOnExam(action.examId).pipe(
                    map( (dataRes) => setQuestions({questions: dataRes.questions}) )
                )
            )
        )
    );

    setQuestionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setQuestions),
            map( ()=> updateStatus({state:'started'}) )
        )
    );

    setCurrentQuestionEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setQuestions),
            withLatestFrom(this._Store.select(questionsSelector)),
            map(([action , questionList])=> setCurrentQuestion({question: questionList[0]}))
        )
    );

    setWrongQuestionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setWrongQuestions),
            map( ()=> updateStatus({state:'get score'}) )
        )
    );

}