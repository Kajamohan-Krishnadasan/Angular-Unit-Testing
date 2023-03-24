import { of } from 'rxjs/internal/observable/of';
import { Post } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';
import { TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';

class mockPostServiceTestBed {
  getPosts() {}
  deletePost(post: Post) {
    return of(true);
  }
}

xdescribe('Posts Component', () => {
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

xdescribe('Testing Posts Component using TestBed method 1', () => {
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

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    // component = new PostsComponent(mockPostService); // without TestBed
    component = TestBed.inject(PostsComponent); // with TestBed
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

xdescribe('Testing Posts Component using TestBed method 2', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let postService: any;

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

    // remove below line because we use mockPostService class
    // postService = jasmine.createSpyObj(['getPosts', 'deletePost']);

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {
          provide: PostService,
          // useValue: mockPostService,
          useClass: mockPostServiceTestBed,
        },
      ],
    });

    // component = new PostsComponent(mockPostService); // without TestBed
    component = TestBed.inject(PostsComponent); // with TestBed
    postService = TestBed.inject(PostService);
  });

  describe('Delete', () => {
    beforeEach(() => {
      /**
       * below line is not work
       * because of delete() method depends on the postService.deletePost()
       * theirfore, we need to mock the postService.deletePost() method
       */
      // component.delete(POSTS[1]);

      // postService.deletePost.and.returnValue(of(true)); // mock the postService.deletePost() method
      component.postsFromComponent = POSTS;
    });

    it('should delete the selected post from the posts', () => {
      component.delete(POSTS[1]);

      expect(component.postsFromComponent.length).toEqual(2);
    });

    it('should delete the actual post from the selected post', () => {
      component.delete(POSTS[1]);

      for (let post of component.postsFromComponent) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post service only once', () => {
      // method 1
      // spyOn(postService, 'deletePost').and.returnValue(of(true));

      // method 2
      spyOn(postService, 'deletePost').and.callThrough();

      component.delete(POSTS[1]);
      expect(postService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
