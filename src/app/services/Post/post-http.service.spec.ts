import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';

describe('Post Service using HttpClientTestingModule', () => {
  let POSTS = [
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
  let postService: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    });

    postService = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getPosts()', () => {
    it('should return posts when getPosts() is called', (done: DoneFn) => {
      postService.getPosts().subscribe((data) => {
        expect(data).toEqual(POSTS);
        done();
      });
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );

      req.flush(POSTS);
      expect(req.request.method).toBe('GET');
    });
  });

  describe('getPost()', () => {
    it('sholud return single post when getPost() is called with postId', () => {
      postService.getPost(1).subscribe();
      /**
       * If we use this line of code this test will fail because we using httpTestingController.verify() method
       */
      // postService.getPost(2).subscribe();

      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts/1'
      );

      expect(req.request.method).toBe('GET');

      httpTestingController.verify(); // this one we can use in afterEach() method
    });
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

});
