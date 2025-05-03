import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootMapComponent } from './shoot-map.component';

describe('ShootMapComponent', () => {
  let component: ShootMapComponent;
  let fixture: ComponentFixture<ShootMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShootMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShootMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
