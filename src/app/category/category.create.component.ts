import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TranslateService } from '../services/translate.service';

interface CategoryCreateDto {
  nameEn: string;
  nameUk: string;
}

interface CategoryDto {
  id: number;
  nameEn: string;
  nameUk: string;
}

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="category-create">
      <h3>{{ translate.t('CATEGORY_CREATE.GREETINGS')}}</h3>
      <form (ngSubmit)="createCategory()" class="form-container">
        <div>
          <label>{{ translate.t('CATEGORY_CREATE.TITLE_EN')}}</label>
          <input type="text" [(ngModel)]="category.nameEn" name="nameEn" required />
        </div>
        <div>
          <label>{{ translate.t('CATEGORY_CREATE.TITLE_UA')}}</label>
          <input type="text" [(ngModel)]="category.nameUk" name="nameUk" required />
        </div>
        <div class="submit-container">
          <button type="submit">{{ translate.t('CATEGORY_CREATE.BOTTON_CREATE')}}</button>
        </div>
      </form>
      <p *ngIf="message">{{ message }}</p>

      <h4>{{ translate.t('CATEGORY_CREATE.LIST_CATEGORY')}}</h4>
      <ul>
        <li *ngFor="let c of categories">
          <span>{{ getCurrentLangName(c) }}</span>
          <button class="delete-btn" (click)="deleteCategory(c.id)">{{ translate.t('CATEGORY_CREATE.BOTTON_DELETE')}}</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .category-create { max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    div { margin-bottom: 10px; }
    label { display: block; margin-bottom: 4px; }
    input { width: 100%; padding: 6px; }
    .form-container { display: flex; flex-direction: column; gap: 10px; }
    .submit-container { display: flex; justify-content: center; }
    button { padding: 6px 12px; }
    ul { list-style: none; padding-left: 0; }
    li { margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; }
    .delete-btn { margin-left: 10px; }
  `]
})
export class CategoryCreateComponent implements OnInit {
  category: CategoryCreateDto = { nameEn: '', nameUk: '' };
  categories: CategoryDto[] = [];
  message = '';

  constructor(private http: HttpClient, public translate: TranslateService) {}

  ngOnInit() {
    this.loadCategories();
  }

  createCategory() {
    this.http.post<CategoryDto>(`${environment.apiBaseUrl}/categories`, this.category)
      .subscribe({
        next: (newCat) => {
          this.message = 'Категория успешно создана!';
          this.category = { nameEn: '', nameUk: '' };
          this.categories.push(newCat);
        },
        error: (err) => {
          console.error(err);
          this.message = 'Ошибка при создании категории';
        }
      });
  }

  loadCategories() {
    this.http.get<CategoryDto[]>(`${environment.apiBaseUrl}/categories`)
      .subscribe({
        next: data => this.categories = data,
        error: err => console.error('Ошибка загрузки категорий', err)
      });
  }

  deleteCategory(id: number) {
    if (!confirm('Вы точно хотите удалить категорию?')) return;

    this.http.delete(`${environment.apiBaseUrl}/categories/${id}`)
      .subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
        },
        error: err => {
          console.error(err);
          this.message = 'Ошибка при удалении категории';
        }
      });
  }

  getCurrentLangName(c: CategoryDto) {
    return this.translate.getCurrentLang() === 'uk' ? c.nameUk : c.nameEn;
  }
}