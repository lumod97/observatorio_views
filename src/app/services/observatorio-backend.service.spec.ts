import { TestBed } from '@angular/core/testing';

import { ObservatorioBackendService } from './observatorio-backend.service';

describe('ObservatorioBackendService', () => {
  let service: ObservatorioBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservatorioBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
