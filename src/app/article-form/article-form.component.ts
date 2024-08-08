import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import Swal from 'sweetalert2';

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
        if (data) {
          this.articleForm.patchValue(data);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article: Article = this.articleForm.value;
      if (this.isEditMode && this.articleId !== undefined) {
        this.articleService.updateArticle(this.articleId, article).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Article bien modifié',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/']);
        });
      } else {
        this.articleService.createArticle(article).subscribe(newArticle => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Article bien Ajouté',
            showConfirmButton: false,
            timer: 1500
          });
           this.router.navigate(['/']);
        });
      }
    }
  }
}
