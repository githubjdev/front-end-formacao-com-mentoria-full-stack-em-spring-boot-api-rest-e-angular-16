import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoComponent } from './forma-pagamento.component';

describe('FormaPagamentoComponent', () => {
  let component: FormaPagamentoComponent;
  let fixture: ComponentFixture<FormaPagamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormaPagamentoComponent]
    });
    fixture = TestBed.createComponent(FormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
