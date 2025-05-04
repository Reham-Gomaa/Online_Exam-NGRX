import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ExamModalSkeletonComponent } from '../../../shared/components/UI/exam-modal-skeleton/exam-modal-skeleton';
import { Exam } from '../../interfaces/Exams/iexam-on-subject-res';
import { ExamsService } from '../../services/Exams/exams.service';
import { QuestionService } from '../../services/Questions/question.service';
import { ExamModalComponent } from "../exam-modal/exam-modal.component";
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { toggleModal } from '../../../store/exam/exam-actions';
import { selectExamModal, selectStatus } from '../../../store/exam/exam-selector';
import { loadQuestions } from '../../../store/questions/question-actions';
import { QuestionAdapt } from '../../interfaces/Questions/iquestions-on-exam-res';
import { questionsSelector } from '../../../store/questions/question-selector';
import { examState } from '../../../store/exam/exam-states';
import { ExamComponent } from "../../../shared/components/business/exam/exam.component";
import { ExamScoreComponent } from "../../../shared/components/business/exam-score/exam-score.component";

@Component({
  selector: 'app-diploma',
  imports: [ExamModalSkeletonComponent, AsyncPipe, ExamComponent, ExamScoreComponent],
  templateUrl: './diploma.component.html',
  styleUrls: ['./diploma.component.scss']
})
export class DiplomaComponent implements OnInit, OnDestroy {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ExamsService = inject(ExamsService);
  private readonly _QuestionService = inject(QuestionService);

  closeModal = computed(() => this._QuestionService.closeModal());

  examsOnSub !: Exam[];
  subjectId !: string;
  exam_id: WritableSignal<string> = signal('');
  showModal: WritableSignal<boolean> = signal(false);
  start: WritableSignal<boolean> = signal(false);
  examsOnSubjectID !: Subscription;
  subjectIdSubscription !: Subscription;
  //---------------------------------------------------

  private readonly _Store = inject(Store);
  isStarted$ !: Observable<boolean>;
  status$ !: Observable<examState>;
  questions: QuestionAdapt[] = [] as QuestionAdapt[]

  ngOnInit(): void {
    this.subjectIdSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.subjectId = param.get('s_id')!
      }
    })

    this.getAllExamsOnSubject(this.subjectId);
  }

  getAllExamsOnSubject(subjectId: string) {
    this.examsOnSubjectID = this._ExamsService.getAllExamsOnSubject(subjectId).subscribe({
      next: (res) => {
        this.examsOnSub = res.exams;
      }
    })
  }

  changeExamStates() {
    this.isStarted$ = this._Store.select(selectExamModal);
    this.status$ = this._Store.select(selectStatus);
  }

  toggleModal(e_id: string) {
    this.exam_id.set(e_id);
    this._Store.dispatch(toggleModal());
    this.changeExamStates();
  }

  loadQuestions() {
    this._Store.dispatch(loadQuestions({ examId: this.exam_id() }));
  }

  startExam() {
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    this.subjectIdSubscription?.unsubscribe();
  }

}
