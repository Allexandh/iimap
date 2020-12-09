import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GooglesitePage } from './googlesite.page';

describe('GooglesitePage', () => {
  let component: GooglesitePage;
  let fixture: ComponentFixture<GooglesitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglesitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GooglesitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
