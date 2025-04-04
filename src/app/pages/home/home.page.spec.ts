import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { StoreModule, Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppState, appReducer } from 'src/app/store/reducers/app.reducer';
import { updateSelectedLanguage } from 'src/app/store/actions/app.actions';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let store: Store<AppState>;
  let translateService: TranslateService;
  let cdRef: ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ app: appReducer }), 
        TranslateModule.forRoot()
      ],
      declarations: [HomePage],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn(), select: jest.fn() } },
        { provide: TranslateService, useValue: { get: jest.fn(), use: jest.fn(), setDefaultLang: jest.fn() } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    translateService = TestBed.inject(TranslateService);
    cdRef = TestBed.inject(ChangeDetectorRef);
  });

  it('should update language buttons when the language changes', () => {
    const cancelText = 'Cancel';
    const spyGet = jest.spyOn(translateService, 'get').mockReturnValue(of(cancelText));

    component.changeLanguage('en');
    
    fixture.detectChanges();

    expect(spyGet).toHaveBeenCalledWith('CANCEL');
    expect(component.languageButtons.length).toBe(4);
    expect(component.languageButtons[3].text).toBe(cancelText);
  });

  it('should update the selected language in store when language is changed', () => {
    const spyDispatch = jest.spyOn(store, 'dispatch');

    component.changeLanguage('de');

    expect(spyDispatch).toHaveBeenCalledWith(updateSelectedLanguage({ language: 'de' }));
  });
});
