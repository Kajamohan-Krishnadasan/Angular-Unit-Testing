import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/Post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postsFromComponent: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    // get the posts from the server
    return this.postService.getPosts().subscribe((postsFromApi) => {
      this.postsFromComponent = postsFromApi;
    });
  }

  delete(post: Post) {
    // remove it from the PostsFromComponent
    this.postsFromComponent = this.postsFromComponent.filter(
      (p) => p.id != post.id
    );

    // remove it from the server
    this.postService.deletePost(post).subscribe();
  }
}
