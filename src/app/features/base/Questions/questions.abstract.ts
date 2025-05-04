import { Observable } from "rxjs";
import { IQuestionsOnExamAdaptorRes, QuestionsAdaptRes } from "../../interfaces/Questions/iquestions-on-exam-res";
import { CheckQuestionInterface, ScoreAdaptorRes } from "../../interfaces/Questions/check-question-interface";

export abstract class QuestionApi {

    abstract getAllQuestionsOnExam(e_id:string):Observable<QuestionsAdaptRes>;
    abstract checkQuestions(data:CheckQuestionInterface):Observable<ScoreAdaptorRes>
    
}