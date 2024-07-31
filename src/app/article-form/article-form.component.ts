import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  isEditMode: boolean = false;
  articleId?: number;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    if (this.articleId) {
      this.isEditMode = true;
      this.articleService.getArticle(this.articleId).subscribe(data => {
        this.articleForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article: Article = this.articleForm.value;
      if (this.isEditMode && this.articleId !== undefined) {
        this.articleService.updateArticle(this.articleId, article).subscribe(() => {
          alert('Article modifier avec succés!');
          this.router.navigate(['/']);
        });
      } else {
        this.articleService.createArticle(article).subscribe(() => {
          alert('Article crée avec succés!');
          this.router.navigate(['/']);
        });
      }
    }
  }
}
