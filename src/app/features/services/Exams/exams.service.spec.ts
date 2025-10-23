import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Base_Url } from '../../../../../projects/auth-api/src/public-api';
import { ExamOnSubjectAdaptorService } from '../../adaptors/exams/exam-on-subject-adaptor.service';
import { ExamsService } from './exams.service';
import { ExamsEndpoints } from '../../enums/Exams/exams.endpoints';
import { IExamOnSubjectAdaptorRes } from '../../interfaces/Exams/iexam-on-subject-res';

fdescribe('ExamsService', () => {
  let service: ExamsService;
  let httpController: HttpTestingController;

  let id = `670037f6728c92b7fdf434fc`;
  let endPoint = ExamsEndpoints.GET_ALL_EXAMS_ON_SUBJECT;
  let mockRes = {
    message: 'success',
    metadata: {
      currentPage: 1,
      numberOfPages: 1,
      limit: 1,
    },
    exams: [
      {
        _id: 'string',
        title: 'string',
        duration: 1,
        subject: 'string',
        numberOfQuestions: 2,
        active: true,
        createdAt: 'string',
      },
    ],
  };
  let adaptedRes: IExamOnSubjectAdaptorRes = {
    exams: [
      {
        _id: 'string',
        title: 'string',
        duration: 1,
        subject: 'string',
        numberOfQuestions: 2,
        active: true,
        createdAt: 'string',
      },
    ],
  };
  let adaptoeMock: jasmine.SpyObj<ExamOnSubjectAdaptorService>;
  let baseUrlMock = 'https://exam.elevateegy.com/api/v1';

  beforeEach(() => {
    adaptoeMock = jasmine.createSpyObj('ExamOnSubjectAdaptorService', [
      'adapt',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ExamsService,
        { provide: Base_Url, useValue: baseUrlMock },
        { provide: ExamOnSubjectAdaptorService, useValue: adaptoeMock },
      ],
    });
    adaptoeMock.adapt.and.returnValue(adaptedRes);
    service = TestBed.inject(ExamsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllExamsOnSubject()', () => {
    it('should send a GET request to the correct endpoint', () => {
      service.getAllExamsOnSubject(id).subscribe();
      const req = httpController.expectOne(baseUrlMock + endPoint + id);
      expect(req.request.method).toBe('GET');
      req.flush(mockRes);
    });

    it('should return adapted response from the adaptor service', () => {
      let response: IExamOnSubjectAdaptorRes | undefined;
      service.getAllExamsOnSubject(id).subscribe((res) => {
        response = res;
      });
      let req = httpController.expectOne(baseUrlMock + endPoint + id);
      req.flush(mockRes);
      expect(adaptoeMock.adapt).toHaveBeenCalledWith(mockRes);
      expect(response).toEqual(adaptedRes);
    });
  });
});
