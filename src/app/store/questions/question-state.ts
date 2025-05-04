import { QuestionAdapt } from "../../features/interfaces/Questions/iquestions-on-exam-res";

export interface QuestionState {
    questions: QuestionAdapt[],
    currentQuestion: QuestionAdapt,
    wrongQuestions: QuestionAdapt[],
    numberOfQuestions: number,
    numberOfWrongQuestions: number
}
