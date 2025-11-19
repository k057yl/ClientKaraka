import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, ItemCreateDto } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Lang } from '../../i18n';
import { TranslateService } from '../../services/translate.service';
import { Subscription } from 'rxjs';

interface Category { id: number; nameEn: string; nameUk: string; }
interface CategoryOption { id: number; displayName: string; }

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item.create.component.html',
  styleUrls: ['./item.create.component.css']
})
export class ItemCreateComponent implements OnInit, OnDestroy {

  // ------------------ MODEL ------------------
  item: ItemCreateDto = { Title: '', Description: '', PurchasePrice: 0, PurchaseDate: '', CategoryId: 0 };
  categories: Category[] = [];
  categoryOptions: CategoryOption[] = [];
  message = '';
  photoUrl = '';
  selectedFileName = '';
  langSub?: Subscription;

  private categoriesUrl = `${environment.apiBaseUrl}/categories`;

  // ------------------ CONSTRUCTOR ------------------
  constructor(
    private auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  // ------------------ INIT / DESTROY ------------------
  ngOnInit() {
    this.auth.token$.subscribe(token => {
      if (!token) this.router.navigate(['/login']);
      else this.loadCategories();
      this.item.PurchaseDate = new Date().toISOString().split('T')[0];
    });

    this.langSub = this.translate.lang$.subscribe(() => this.buildCategoryOptions());
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  // ------------------ CATEGORY ------------------
  loadCategories() {
    this.auth['http'].get<Category[]>(this.categoriesUrl).subscribe({ 
      next: data => { this.categories = data; this.buildCategoryOptions(); },
      error: err => console.error('Ошибка загрузки категорий', err)
    });
  }

  buildCategoryOptions() {
    const lang: Lang = this.translate.getCurrentLang();
    this.categoryOptions = this.categories.map(c => ({
      id: c.id,
      displayName: lang === 'uk' ? c.nameUk : c.nameEn
    }));
  }

  // ------------------ FILE UPLOAD ------------------
  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.selectedFileName = file.name;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.cloudinaryPreset);

    fetch(environment.cloudinaryUrl, { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.secure_url) this.photoUrl = data.secure_url;
        else console.error('Ошибка загрузки на Cloudinary', data);
      })
      .catch(err => console.error('Upload error:', err));
  }

  // ------------------ CREATE ITEM ------------------
  createItem(): void {
    if (!this.item.Title.trim()) { this.message = this.t('ITEM_CREATE.ERROR_TITLE'); return; }
    if (!this.item.CategoryId) { this.message = this.t('ITEM_CREATE.ERROR_CATEGORY'); return; }
    if (!this.item.PurchasePrice || this.item.PurchasePrice <= 0) { this.message = this.t('ITEM_CREATE.ERROR_PRICE'); return; }
    if (!this.photoUrl) { this.message = this.t('ITEM_CREATE.ERROR_PHOTO'); return; }

    const dto: ItemCreateDto = { ...this.item, PurchaseDate: new Date(this.item.PurchaseDate).toISOString(), PhotoUrl: this.photoUrl };

    this.auth.createItem(dto).subscribe({
      next: () => this.message = this.t('ITEM_CREATE.SUCCESS'),
      error: err => { console.error(err); this.message = this.t('ITEM_CREATE.ERROR_CREATE'); }
    });
  }

  // ------------------ HELPERS ------------------
  t(key: string): string { return this.translate.t(key); }
}