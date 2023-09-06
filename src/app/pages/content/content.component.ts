import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService, Comment } from 'src/app/config/config.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  comments: Comment[] = [];
  id: string | null = '';

  constructor(
    private FetchService: FetchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.FetchService.getComments().subscribe((response) => {
      this.comments = response;
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');
        this.setComment(this.id);
      });
    });
  }

  setComment(id: string | null) {
    if (id) {
      this.comments = this.comments.filter(
        (comment) => comment.postId.toString() == id
      );
    }
  }
}
