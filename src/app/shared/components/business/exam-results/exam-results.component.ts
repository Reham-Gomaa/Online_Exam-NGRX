import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { QuestionAdapt } from '../../../../features/interfaces/Questions/iquestions-on-exam-res';
import { selectWrongQuestions } from '../../../../store/questions/question-selector';
import { CloseModalBtnComponent } from "../close-modal-btn/close-modal-btn.component";

@Component({
  selector: 'app-exam-results',
  imports: [CloseModalBtnComponent],
  templateUrl: './exam-results.component.html',
  styleUrl: './exam-results.component.scss'
})
export class ExamResultsComponent implements OnInit, OnDestroy {
  private readonly _Store = inject(Store);

  wrongQuestions: QuestionAdapt[] = [] as QuestionAdapt[];
  wrongQId !: Subscription;

  getWrongQuestions() {
    this._Store.select(selectWrongQuestions).subscribe({
      next: (questions) => {
        this.wrongQuestions = questions
      }
    })
  }

  ngOnInit(): void {
    this.getWrongQuestions();
  }

  ngOnDestroy(): void {
    this.wrongQId?.unsubscribe();
  }

}
