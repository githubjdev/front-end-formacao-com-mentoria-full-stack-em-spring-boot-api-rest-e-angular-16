import { TestBed } from '@angular/core/testing';

import { CategoriaProdutoService } from './categoria-produto.service';

describe('CategoriaProdutoService', () => {
  let service: CategoriaProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
