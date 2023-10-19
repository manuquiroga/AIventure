import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreationComponent } from './character-creation.component';

describe('CharacterCreationComponent', () => {
  let component: CharacterCreationComponent;
  let fixture: ComponentFixture<CharacterCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterCreationComponent]
    });
    fixture = TestBed.createComponent(CharacterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
