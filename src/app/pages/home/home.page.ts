import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { updateSelectedLanguage } from 'src/app/store/actions/app.actions';
import { LocationSelectorComponent } from 'src/app/components/location-selector/location-selector-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, StoreModule, LocationSelectorComponent, TranslateModule, CommonModule]
})
export class HomePage implements OnInit {
  selectedLanguage$: Observable<string>;
  languageButtons: any[] = [];

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {
    this.selectedLanguage$ = this.store.select(state => state.selectedLanguage);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit() {
    this.store.dispatch(updateSelectedLanguage({ language: 'en' }));

    this.selectedLanguage$.subscribe((language) => {
      this.updateLanguageButtons(language);
    });
  }

  updateLanguageButtons(language: string = 'en') {
    this.translateService.get('CANCEL').subscribe((cancelText: string) => {
      console.log('Cancel Text:', cancelText);

      this.languageButtons = [
        { text: 'Slovenščina', handler: () => this.changeLanguage('slo') },
        { text: 'English', handler: () => this.changeLanguage('en') },
        { text: 'Deutsch', handler: () => this.changeLanguage('de') },
        { text: cancelText, role: 'cancel' }
      ];

      this.cdRef.detectChanges();
    });
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.store.dispatch(updateSelectedLanguage({ language: lang }));
    this.updateLanguageButtons(lang);
  }
}
