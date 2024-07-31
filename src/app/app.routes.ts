import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleFormComponent } from './article-form/article-form.component';

export const appRoutes: Routes = [
  { path: '', component: ArticleListComponent, pathMatch: 'full' },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'new-article', component: ArticleFormComponent },
  { path: 'edit-article/:id', component: ArticleFormComponent }
];
