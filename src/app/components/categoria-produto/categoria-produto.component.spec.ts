import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProdutoComponent } from './categoria-produto.component';

describe('CategoriaProdutoComponent', () => {
  let component: CategoriaProdutoComponent;
  let fixture: ComponentFixture<CategoriaProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaProdutoComponent]
    });
    fixture = TestBed.createComponent(CategoriaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
