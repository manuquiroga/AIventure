import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateNavbarComponent } from './private-navbar.component';

describe('PrivateNavbarComponent', () => {
  let component: PrivateNavbarComponent;
  let fixture: ComponentFixture<PrivateNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateNavbarComponent]
    });
    fixture = TestBed.createComponent(PrivateNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
