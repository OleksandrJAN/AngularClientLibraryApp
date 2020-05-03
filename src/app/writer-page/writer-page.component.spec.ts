import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterPageComponent } from './writer-page.component';

describe('WriterPageComponent', () => {
  let component: WriterPageComponent;
  let fixture: ComponentFixture<WriterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
