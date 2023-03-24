import { of } from 'rxjs/internal/observable/of';
import { Post } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';

describe('Posts Component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        title: 'Post 1',
        body: 'This is post 1',
      },
      {
        id: 2,
        title: 'Post 2',
        body: 'This is post 2',
      },
      {
        id: 3,
        title: 'Post 3',
        body: 'This is post 3',
      },
    ];

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    component = new PostsComponent(mockPostService);
  });

  describe('Delete', () => {
    beforeEach(() => {
      /**
       * below line is not work
       * because of delete() method depends on the postService.deletePost()
       * theirfore, we need to mock the postService.deletePost() method
       */
      // component.delete(POSTS[1]);

      mockPostService.deletePost.and.returnValue(of(true)); // mock the postService.deletePost() method
      component.postsFromComponent = POSTS;

      component.delete(POSTS[1]);
    });


    it('should delete the selected post from the posts', () => {
      let afterDeleteCount = component.postsFromComponent.length;
      expect(afterDeleteCount).toEqual(2);
    });

    it('should delete the actual post from the selected post', () => {

      // method 1
      expect(component.postsFromComponent).not.toContain(POSTS[1]);

      // method 2
      for (let post of component.postsFromComponent) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post service only once', () => {
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
