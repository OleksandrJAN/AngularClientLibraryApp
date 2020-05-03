import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterFormComponent } from './writer-form.component';

describe('WriterFormComponent', () => {
  let component: WriterFormComponent;
  let fixture: ComponentFixture<WriterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
