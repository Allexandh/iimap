import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProvinsiPage } from './provinsi.page';

describe('ProvinsiPage', () => {
  let component: ProvinsiPage;
  let fixture: ComponentFixture<ProvinsiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinsiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProvinsiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
