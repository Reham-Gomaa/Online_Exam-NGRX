import { map } from 'rxjs/operators';
import { createReducer, on } from "@ngrx/store";
import { QuestionAdapt } from "../../features/interfaces/Questions/iquestions-on-exam-res";
import { QuestionState } from "./question-state";
import { loadQuestions, onBack, onNext, resetQuestionState, setCurrentQuestion, setQuestions, setSelectedAnswer, setWrongQuestions } from "./question-actions";


export const initialState:QuestionState = {
    questions: [] ,
    currentQuestion: {} as QuestionAdapt,
    wrongQuestions: [] ,
    numberOfQuestions: 0,
    numberOfWrongQuestions: 0
}

export const questionReducer = createReducer(
    initialState,

    on(loadQuestions , ()=> initialState),

    on(setQuestions , (state , {questions})=> ({
        ...state,
        questions: questions,
        numberOfQuestions: questions.length
    })),

    on(setCurrentQuestion , (state , {question})=>({
        ...state,
        currentQuestion: question
    })),

    on(setSelectedAnswer , (state , {qId , selectedAnswer})=>({
        ...state,
        questions : state.questions.map((q)=>q.id == qId ? {...q , selectedAnswer} : q)
    })),

    on(onNext , (state , {index})=>({
        ...state,
        currentQuestion: state.questions[index + 1]
    })),

    on(onBack , (state , {index})=>({
        ...state,
        currentQuestion: state.questions[index - 1]
    })),

    on(setWrongQuestions , (state)=>({
        ...state,
        wrongQuestions: state.questions.filter((q)=> q.correct != q.selectedAnswer),
        numberOfWrongQuestions: state.questions.filter((q)=> q.correct != q.selectedAnswer).length
    })),

    on(resetQuestionState , ()=> initialState)
)