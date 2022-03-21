import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceService } from './authentication-service.service';

describe('AuthenticationServiceService', () => {
  let service: AuthenticationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers:[]
  }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
