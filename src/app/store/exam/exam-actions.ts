import { state } from '@angular/animations';
import { createAction, on, props } from "@ngrx/store";
import { examState } from './exam-states';

export const toggleModal = createAction('[Exam] toggle modal');

export const updateStatus = createAction('[Exam] update status' , props<{state: examState}>());