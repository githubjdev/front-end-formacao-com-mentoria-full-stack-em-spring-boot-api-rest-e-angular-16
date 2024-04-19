import { TestBed } from '@angular/core/testing';

import { InterceptorProjetoInterceptor } from './interceptor-projeto.interceptor';

describe('InterceptorProjetoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorProjetoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorProjetoInterceptor = TestBed.inject(InterceptorProjetoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
