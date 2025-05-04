import { createAction, props } from "@ngrx/store";
import { QuestionAdapt } from "../../features/interfaces/Questions/iquestions-on-exam-res";


export const loadQuestions = createAction("[Question] load questions",
  props<{ examId: string }>()
);

export const setQuestions = createAction("[Question] set questions",
  props<{ questions: QuestionAdapt[] }>()
);

export const setCurrentQuestion = createAction('[Question] set current question' , 
  props<{ question : QuestionAdapt }>()
);

export const setSelectedAnswer = createAction("[Question] set selected answer" ,
  props<{qId :string , selectedAnswer :string}>()
);

export const onNext = createAction("[Question] on next" , 
  props<{index:number}>()
);

export const onBack = createAction("[Question] on back" ,
  props<{index:number}>()
);

export const setWrongQuestions = createAction("[Question] set wrong question");

export const resetQuestionState = createAction("[Question] reset question state");

