import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuestionAdapt } from '../../../../features/interfaces/Questions/iquestions-on-exam-res';
import { onBack, onNext, setSelectedAnswer, setWrongQuestions } from '../../../../store/questions/question-actions';
import { selectCurrentQuestion, selectNumberOfQuestions } from '../../../../store/questions/question-selector';

@Component({
  selector: 'app-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  private readonly _Store = inject(Store);

  currentQuestion: QuestionAdapt = {} as QuestionAdapt;
  numberOfQuestions !: number;
  quizForm !: FormGroup;
  isNextBtnDisabled: boolean = true;
  isBackBtnDisabled: boolean = true;

  onNext() {
    const selectedValue = this.quizForm.get('selectedAnswer')?.value;
    this._Store.dispatch(setSelectedAnswer({ qId: this.currentQuestion.id, selectedAnswer: selectedValue }));
    if (this.currentQuestion.index == this.numberOfQuestions - 1) {
      this._Store.dispatch(setWrongQuestions());
      return;
    }
    this.disableNextBtn();
    this._Store.dispatch(onNext({ index: this.currentQuestion.index }));
    if (this.currentQuestion.selectedAnswer) {
      this.enableNextBtn();
      this.setFormValue(this.currentQuestion.selectedAnswer);
    } else {
      this.disableNextBtn();
      this.setFormValue(null);
    }
    this.enableBackBtn();
  }

  onBack() {
    this.enableNextBtn();
    this._Store.dispatch(onBack({ index: this.currentQuestion.index }));
    if (this.currentQuestion.index == 0) {
      this.disableBackBtn();
    }

  }

  enableNextBtn() {
    this.isNextBtnDisabled = false;
  }
  disableNextBtn() {
    this.isNextBtnDisabled = true;
  }
  enableBackBtn() {
    this.isBackBtnDisabled = false;
  }
  disableBackBtn() {
    this.isBackBtnDisabled = true;
  }

  onSelectAnswer() {
    this.enableNextBtn()
  }

  setFormValue(value: string | null) {
    this.quizForm.get('selectedAnswer')?.setValue(value);
  }

  initForm() {
    this.quizForm = new FormGroup({
      selectedAnswer: new FormControl(null)
    })
  }

  getRange(num: number) {
    return num ? [...Array(num).keys()] : [];
  }

  getNumberOfQuestions() {
    this._Store.select(selectNumberOfQuestions).subscribe({
      next: (num) => { this.numberOfQuestions = num }
    })
  }

  getCurrentQuestion() {
    this._Store.select(selectCurrentQuestion).subscribe({
      next: (question) => {
        this.currentQuestion = question;
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentQuestion();
    this.getNumberOfQuestions();
  }

}
