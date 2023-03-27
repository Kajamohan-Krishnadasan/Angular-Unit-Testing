import { of } from 'rxjs/internal/observable/of';
import { Post } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../post/post.component';

class mockPostServiceTestBed {
  getPosts() {}
  deletePost(post: Post) {
    return of(true);
  }
}

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

describe('Testing Posts Component using TestBed method 1', () => {
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

describe('Testing Posts Component using TestBed method 2', () => {
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

describe('Testing Posts Component using TestBed and fake PostComponent (checking the component class and compained with a template)', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

  /**
   * here we are creating a fake component class
   * because we are not testing the PostComponent
   * we are testing the PostsComponent
   * therefore, we are creating a fake component class
   * and we are passing the PostComponent as a input
   * and we are checking the PostsComponent
   * and we are not checking the PostComponent
   */
  @Component({
    selector: 'app-post',
    template: '<div></div>',
  })
  class FakePostComponent {
    @Input() post!: Post;
  }

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

    // here we are checking the component class and compained with a template
    /**
     * TestBed.configureTestingModule() method is used to configure the testing module
     * declarations: here we are declaring the component class
     * providers: here we are declaring the service class
     */
    TestBed.configureTestingModule({
      declarations: [PostsComponent, FakePostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should set Posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));

    // component.ngOnInit();
    fixture.detectChanges();
    alert(component.postsFromComponent.length);
    expect(component.postsFromComponent.length).toBe(3);
  });

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();

    const debugElements = fixture.debugElement;
    const postsElement = debugElements.queryAll(By.css('.posts-div'));

    expect(postsElement.length).toBe(POSTS.length);
  });

  describe('Delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
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
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Testing Posts Component using TestBed and real PostComponent', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

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
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  it('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges(); // this will call ngOnInit() method

    const PostComponentDebugElements = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    // accessing the 1st child component instance of PostComponent
    for (let i = 0; i < PostComponentDebugElements.length; i++) {
      let postComponentInstance = PostComponentDebugElements[i]
        .componentInstance as PostComponent;
      expect(postComponentInstance.post.title).toEqual(POSTS[i].title);
    }
  });

  it('should create exact same number of Post Component with Posts', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges(); // this will call ngOnInit() method

    const PostComponentDebugElements = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    expect(PostComponentDebugElements.length).toBe(POSTS.length);
  });

  it('should set Posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));

    // component.ngOnInit();
    fixture.detectChanges();
    alert(component.postsFromComponent.length);
    expect(component.postsFromComponent.length).toBe(3);
  });

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();

    const debugElements = fixture.debugElement;
    const postsElement = debugElements.queryAll(By.css('.posts-div'));

    expect(postsElement.length).toBe(POSTS.length);
  });
});

describe('Posts Component', () => {
  let POSTS: Post[];
  let component: PostsComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostsComponent>;

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
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
  });

  describe('Delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
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
      component.delete(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });

    it('should call delete method when post component delete button is clicked', () => {
      // here we are creating a spy for the delete method in the PostComponent
      spyOn(component, 'delete');

      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      // here we are getting all the post component debug elements
      let postComponentDebugElements = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      for (let i = 0; i < postComponentDebugElements.length; i++) {
        // here we are triggering the click event
        postComponentDebugElements[i]
          .query(By.css('button'))
          .triggerEventHandler('click', { preventDefault: () => {} });

        // here we are checking the delete method is called or not
        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });

    it('should call the delete method when the delete event is emitted in Post component', () => {
      spyOn(component, 'delete');

      mockPostService.getPosts.and.returnValue(of(POSTS));
      fixture.detectChanges();

      let postComponentDebugElements = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      for (let i = 0; i < postComponentDebugElements.length; i++) {
        (
          postComponentDebugElements[i].componentInstance as PostComponent
        ).delete.emit(POSTS[i]);

        expect(component.delete).toHaveBeenCalledWith(POSTS[i]);
      }
    });
  });
});
