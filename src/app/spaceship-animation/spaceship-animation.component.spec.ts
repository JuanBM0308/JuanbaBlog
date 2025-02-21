import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceshipAnimationComponent } from './spaceship-animation.component';

describe('SpaceshipAnimationComponent', () => {
  let component: SpaceshipAnimationComponent;
  let fixture: ComponentFixture<SpaceshipAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceshipAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceshipAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
