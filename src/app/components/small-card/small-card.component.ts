import { Component, Input, OnInit } from '@angular/core';
import { FetchService, Post } from './../../config/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css'],
})
export class SmallCardComponent implements OnInit {
  posts: Post[] = [];
  id: string | null = '';

  constructor(
    private FetchService: FetchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.FetchService.getPosts().subscribe((response) => {
      this.posts = response;
      this.posts = this.posts.slice(0, 20);
    });
    this.route.paramMap.subscribe((response) => (this.id = response.get('id')));
    this.setId(this.id);
  }

  setId(id: string | null) {
    const result = this.posts.filter((post) => post.id.toString() == id);
    return result;
  }
}
