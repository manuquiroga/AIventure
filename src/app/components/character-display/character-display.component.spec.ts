import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDisplayComponent } from './character-display.component';

describe('CharacterDisplayComponent', () => {
  let component: CharacterDisplayComponent;
  let fixture: ComponentFixture<CharacterDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDisplayComponent]
    });
    fixture = TestBed.createComponent(CharacterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
