import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetExamState } from '../../../../store/exam/exam-actions';
import { resetQuestionState } from '../../../../store/questions/question-actions';

@Component({
  selector: 'app-close-modal-btn',
  imports: [],
  templateUrl: './close-modal-btn.component.html',
  styleUrl: './close-modal-btn.component.scss'
})
export class CloseModalBtnComponent {
  private readonly _Store = inject(Store);

  close(){
    this._Store.dispatch(resetQuestionState());
    this._Store.dispatch(resetExamState());
  }
}
