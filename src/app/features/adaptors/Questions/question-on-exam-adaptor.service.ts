import { Injectable } from '@angular/core';
import { IAdapt } from '../../interfaces/iadapt';
import { IQuestionsOnExamRes, QuestionsAdaptRes } from '../../interfaces/Questions/iquestions-on-exam-res';

@Injectable({
  providedIn: 'root'
})
export class QuestionOnExamAdaptorService implements IAdapt{

  adapt(data: IQuestionsOnExamRes): QuestionsAdaptRes {
    return { 
      questions: data.questions.map((question , index)=>({
        answer: question.answers.map((answer)=>({
          key: answer.key,
          answer: answer.answer
        })),
        id: question._id,
        question: question.question,
        correct: question.correct,
        index: index,
        exam: question.exam
      }))
    }
  }

  // adapt(data: IQuestionsOnExamRes): IQuestionsOnExamAdaptorRes {
  //   return { questions  : data.questions }
  // }
}
