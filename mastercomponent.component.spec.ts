import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastercomponentComponent } from './mastercomponent.component';

describe('MastercomponentComponent', () => {
  let component: MastercomponentComponent;
  let fixture: ComponentFixture<MastercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MastercomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MastercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
