import { Component, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

/**
 * toggle buttons to switch the language of the user interface
 * @author rodrigo andree saavedra flores
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe, UpperCasePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  protected currentLang = 'en';
  protected languages: string[];
  #translate: TranslateService;

  constructor() {
    this.#translate = inject(TranslateService);
    this.currentLang = this.#translate.getCurrentLang() ?? 'en';
    this.languages = [...this.#translate.getLangs()];
  }

  useLanguage(language: string) {
    this.#translate.use(language);
    this.currentLang = language;
  }
}
