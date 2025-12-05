import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { translations, Lang } from '../i18n/index';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly STORAGE_KEY = 'app_lang';

  private currentLang: Lang;
  private langSubject: BehaviorSubject<Lang>;
  lang$;

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Lang;

    this.currentLang = saved || 'en';

    this.langSubject = new BehaviorSubject<Lang>(this.currentLang);
    this.lang$ = this.langSubject.asObservable();
  }

  switchLang(lang: Lang) {
    this.currentLang = lang;
    localStorage.setItem(this.STORAGE_KEY, lang);
    this.langSubject.next(lang);
  }

  t(key: string): string {
    const keys = key.split('.');
    let val: any = translations[this.currentLang];

    for (const k of keys) {
      if (val[k] === undefined) return key;
      val = val[k];
    }

    return val;
  }

  getCurrentLang(): Lang {
    return this.currentLang;
  }
}