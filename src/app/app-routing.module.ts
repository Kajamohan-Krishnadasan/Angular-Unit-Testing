import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    component: PostComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
];

// const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
