import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { updateStatus } from '../../../../store/exam/exam-actions';
import {
  selectNumberOfQuestions,
  selectNumOfWrong,
} from '../../../../store/questions/question-selector';
import { CloseModalBtnComponent } from '../close-modal-btn/close-modal-btn.component';

@Component({
  selector: 'app-exam-score',
  imports: [BaseChartDirective, CloseModalBtnComponent],
  templateUrl: './exam-score.component.html',
  styleUrls: ['./exam-score.component.scss'],
})
export class ExamScoreComponent implements AfterViewInit, OnDestroy {
  private readonly _Store = inject(Store);

  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLabels: string[] = [] as string[];
  doughnutChartData!: ChartData<'doughnut'>;
  numOfWrong: number = 0;
  numOfCorrect: number = 0;
  //timer !:NodeJS.Timeout;
  timer!: any;
  NumOfWrongQId!: Subscription;
  NumOfCorrectQId!: Subscription;

  getNumOfWrong() {
    this.NumOfWrongQId = this._Store.select(selectNumOfWrong).subscribe({
      next: (num) => {
        this.numOfWrong = num;
      },
    });
  }

  getNumOfCorrect() {
    this.NumOfCorrectQId = this._Store
      .select(selectNumberOfQuestions)
      .subscribe({
        next: (num) => {
          this.numOfCorrect = num - this.numOfWrong;
        },
      });
  }

  initChart() {
    this.doughnutChartLabels = ['wrong', 'correct'];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [this.numOfWrong, this.numOfCorrect],
          backgroundColor: ['#CC1010', '#02369C'],
        },
      ],
    };
  }

  ngAfterViewInit(): void {
    this.timer = setTimeout(() => {
      this.getNumOfWrong();
      this.getNumOfCorrect();
      this.initChart();
    });
  }

  showResults() {
    this._Store.dispatch(updateStatus({ state: 'results' }));
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
    this.NumOfCorrectQId?.unsubscribe();
    this.NumOfWrongQId?.unsubscribe();
  }
}
