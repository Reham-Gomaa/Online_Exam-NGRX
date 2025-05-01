import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamModalSkeletonComponent } from '../../../shared/components/UI/exam-modal-skeleton/exam-modal-skeleton';
import { Exam } from '../../interfaces/Exams/iexam-on-subject-res';
import { ExamsService } from '../../services/Exams/exams.service';
import { QuestionService } from '../../services/Questions/question.service';
import { ExamModalComponent } from "../exam-modal/exam-modal.component";

@Component({
  selector: 'app-diploma',
  imports: [ExamModalComponent , ExamModalSkeletonComponent],
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
  exam_id : WritableSignal<string> = signal('');
  showModal: WritableSignal<boolean> = signal(false);
  start: WritableSignal<boolean> = signal(false);
  examsOnSubjectID !: Subscription;
  subjectIdSubscription !: Subscription;

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

  showInstructions(e_id:string) {
    this.showModal.update((value) => value = true);
    this.exam_id.set(e_id);
  }

  startExam() {
    this.start.update((value) => value = true);
  }

  ngOnDestroy(): void {
    this.subjectIdSubscription?.unsubscribe();
  }

}
