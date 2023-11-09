import {TestBed} from '@angular/core/testing';

import {ChartsDataService} from './charts-data.service';

describe('ChartsDataService', () => {
  let service: ChartsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add days 1', () => {
    expect(service.addDays(100, 1)).toEqual(86400100)
  })

  it('add days 10', () => {
    expect(service.addDays(100, 10)).toEqual(864000100)
  })

  it('add days 30', () => {
    expect(service.addDays(100, 30)).toEqual(2592000100)
  })
});
