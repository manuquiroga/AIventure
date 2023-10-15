import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCharacterCardComponent } from './non-character-card.component';

describe('NonCharacterCardComponent', () => {
  let component: NonCharacterCardComponent;
  let fixture: ComponentFixture<NonCharacterCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonCharacterCardComponent]
    });
    fixture = TestBed.createComponent(NonCharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
