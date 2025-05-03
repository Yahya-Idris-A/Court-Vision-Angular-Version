import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnalyzeComponent } from './detail-analyze.component';

describe('DetailAnalyzeComponent', () => {
  let component: DetailAnalyzeComponent;
  let fixture: ComponentFixture<DetailAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAnalyzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
