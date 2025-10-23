import { TestBed } from '@angular/core/testing';

import { SubjectService } from './subject.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Base_Url } from '../../../../../projects/auth-api/src/public-api';
import { AllSubjectAdaptorService } from '../../adaptors/subject/all-subject-adaptor.service';
import { SingleSubjectAdaptorService } from '../../adaptors/subject/single-subject-adaptor.service';
import { SubjectsEndpoint } from '../../enums/Subjects/subjects.endpoints';

fdescribe('SubjectService', () => {
  let service: SubjectService;
  let httpController: HttpTestingController;
  let singleSubjectAdaptorServiceMock: jasmine.SpyObj<any>;
  let allSubjectAdaptorServiceMock: jasmine.SpyObj<any>;

  let baseURLMock = `https://exam.elevateegy.com/api/v1`;
  let allSubjectEndpoint = SubjectsEndpoint.SUBJECTS;
  let singleSubjectEndpoint = SubjectsEndpoint.GET_SINGLE_SUBJECT;

  let apiResponse = { data: { subj: [{ id: 1, name: 'reham' }] } };
  let adaptorResponse = { subj: [{ id: 1, name: 'reham' }] };

  beforeEach(() => {
    singleSubjectAdaptorServiceMock = jasmine.createSpyObj(
      'SingleSubjectAdaptorService',
      ['adapt']
    );
    allSubjectAdaptorServiceMock = jasmine.createSpyObj(
      'AllSubjectAdaptorService',
      ['adapt']
    );
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SubjectService,
        { provide: Base_Url, useValue: baseURLMock },
        {
          provide: AllSubjectAdaptorService,
          useValue: allSubjectAdaptorServiceMock,
        },
        {
          provide: SingleSubjectAdaptorService,
          useValue: singleSubjectAdaptorServiceMock,
        },
      ],
    });
    allSubjectAdaptorServiceMock.adapt.and.returnValue(adaptorResponse);
    singleSubjectAdaptorServiceMock.adapt.and.returnValue(adaptorResponse);
    service = TestBed.inject(SubjectService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllSubjects()', () => {
    it('test api method', () => {
      service.getAllSubjects().subscribe();

      let req = httpController.expectOne(baseURLMock + allSubjectEndpoint);
      expect(req.request.method).toBe('GET');
    });

    it('test adapted response', () => {
      let response: any;
      service.getAllSubjects().subscribe((res) => {
        response = res;
      });
      let req = httpController.expectOne(baseURLMock + allSubjectEndpoint);
      req.flush(apiResponse);
      expect(allSubjectAdaptorServiceMock.adapt).toHaveBeenCalledWith(
        apiResponse
      );
      expect(response).toEqual(adaptorResponse);
    });
  });

  describe('getSingleSubject()', () => {
    it('test api method', () => {
      service.getSingleSubject('6715db9addfd54f0a196ab6c').subscribe();
      let req = httpController.expectOne(
        baseURLMock + singleSubjectEndpoint + '6715db9addfd54f0a196ab6c'
      );
      expect(req.request.method).toBe('GET');
    });

    it('test adapted response', () => {
      let response: any;
      service.getSingleSubject('6715db9addfd54f0a196ab6c').subscribe((res) => {
        response = res;
      });
      let req = httpController.expectOne(
        baseURLMock + singleSubjectEndpoint + '6715db9addfd54f0a196ab6c'
      );
      req.flush(apiResponse);
      expect(singleSubjectAdaptorServiceMock.adapt).toHaveBeenCalledWith(
        apiResponse
      );
      expect(response).toEqual(adaptorResponse);
    });
  });
});
