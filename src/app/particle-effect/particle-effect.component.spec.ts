import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleEffectComponent } from './particle-effect.component';

describe('ParticleEffectComponent', () => {
  let component: ParticleEffectComponent;
  let fixture: ComponentFixture<ParticleEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticleEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticleEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
