import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaProdutoComponent } from './marca-produto.component';

describe('MarcaProdutoComponent', () => {
  let component: MarcaProdutoComponent;
  let fixture: ComponentFixture<MarcaProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaProdutoComponent]
    });
    fixture = TestBed.createComponent(MarcaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
