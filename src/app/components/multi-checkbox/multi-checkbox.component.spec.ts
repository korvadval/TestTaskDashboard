import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiCheckboxComponent} from './multi-checkbox.component';
import {AppModule} from "../../app.module";

describe('MultiCheckboxComponent', () => {
  let component: MultiCheckboxComponent;
  let fixture: ComponentFixture<MultiCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [
        MultiCheckboxComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
