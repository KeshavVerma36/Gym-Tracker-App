import { TestBed } from '@angular/core/testing';

import { ExercisesService } from './exercise.service';

describe('ExerciseService', () => {
  let service: ExercisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
