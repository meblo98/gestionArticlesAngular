
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../article.service';
import { CommentService } from '../comment.service';
import { Article, Comment } from '../article.model';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article?: Article;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const articleId = +this.route.snapshot.params['id'];
    if (articleId) {
      this.articleService.getArticle(articleId).subscribe(article => {
        this.article = article;
        this.loadComments(articleId);
      });
    }
  }

  loadComments(postId: number): void {
    this.commentService.getCommentsByPostId(postId).subscribe(comments => {
      this.comments = comments;
    });
  }
}

