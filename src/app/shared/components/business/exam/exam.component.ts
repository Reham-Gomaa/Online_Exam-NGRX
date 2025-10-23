import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuestionAdapt } from '../../../../features/interfaces/Questions/iquestions-on-exam-res';
import {
  onBack,
  onNext,
  setSelectedAnswer,
  setWrongQuestions,
} from '../../../../store/questions/question-actions';
import {
  selectCurrentQuestion,
  selectNumberOfQuestions,
} from '../../../../store/questions/question-selector';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  animations: [
    trigger('quiz', [
      state(
        '*',
        style({
          opacity: '1',
          transform: 'translateX(0px)',
        })
      ),
      transition(
        (fromState, toState) => toState.startsWith('next'),
        [
          style({
            opacity: '0',
            transform: 'translateX(100px)',
          }),
          animate(300),
        ]
      ),
      transition(
        (fromState, toState) => toState.startsWith('back'),
        [
          style({
            opacity: '0',
            transform: 'translateX(-100px)',
          }),
          animate(300),
        ]
      ),
    ]),
  ],
})
export class ExamComponent implements OnInit, OnDestroy {
  private readonly _Store = inject(Store);

  direction!: 'back' | 'next';
  currentQuestion: QuestionAdapt = {} as QuestionAdapt;
  minutes!: number;
  seconds!: number;
  //timerId !:NodeJS.Timeout;
  timerId!: any;
  numberOfQuestions!: number;
  quizForm!: FormGroup;
  isNextBtnDisabled: boolean = true;
  isBackBtnDisabled: boolean = true;
  selectCurrentQId!: Subscription;
  selectNumOfQId!: Subscription;

  getQuestionDirection(): string {
    return `${this.direction}-${this.currentQuestion.index}`;
  }

  onNext() {
    this.direction = 'next';
    const selectedValue = this.quizForm.get('selectedAnswer')?.value;
    this._Store.dispatch(
      setSelectedAnswer({
        qId: this.currentQuestion.id,
        selectedAnswer: selectedValue,
      })
    );
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
    this.direction = 'back';
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
    this.enableNextBtn();
  }

  setFormValue(value: string | null) {
    this.quizForm.get('selectedAnswer')?.setValue(value);
  }

  initForm() {
    this.quizForm = new FormGroup({
      selectedAnswer: new FormControl(null),
    });
  }

  getRange(num: number) {
    return num ? [...Array(num).keys()] : [];
  }

  setTimer() {
    this.timerId = setInterval(() => {
      if (this.seconds == 0) {
        this.minutes = this.minutes - 1;
        this.seconds = 59;
      } else {
        this.seconds = this.seconds - 1;
      }
      if (this.minutes == 0) {
        clearInterval(this.timerId);
        this._Store.dispatch(setWrongQuestions());
      }
    }, 1000);
  }

  getNumberOfQuestions() {
    this.selectNumOfQId = this._Store
      .select(selectNumberOfQuestions)
      .subscribe({
        next: (num) => {
          this.numberOfQuestions = num;
        },
      });
  }

  getCurrentQuestion() {
    this.selectCurrentQId = this._Store
      .select(selectCurrentQuestion)
      .subscribe({
        next: (question) => {
          this.currentQuestion = question;
          this.minutes = question.exam.duration;
          this.seconds = 0;
          this.setTimer();
        },
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentQuestion();
    this.getNumberOfQuestions();
  }

  ngOnDestroy(): void {
    this.quizForm.reset();
    this.selectCurrentQId?.unsubscribe();
    this.selectNumOfQId?.unsubscribe();
  }
}
