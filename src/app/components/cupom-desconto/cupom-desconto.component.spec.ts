import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupomDescontoComponent } from './cupom-desconto.component';

describe('CupomDescontoComponent', () => {
  let component: CupomDescontoComponent;
  let fixture: ComponentFixture<CupomDescontoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CupomDescontoComponent]
    });
    fixture = TestBed.createComponent(CupomDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
