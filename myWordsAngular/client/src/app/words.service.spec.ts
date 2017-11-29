/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WordsService } from './words.service';

describe('WordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordsService]
    });
  });

  it('should ...', inject([WordsService], (service: WordsService) => {
    expect(service).toBeTruthy();
  }));
});
