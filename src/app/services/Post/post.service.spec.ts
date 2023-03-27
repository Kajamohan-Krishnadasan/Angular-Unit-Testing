import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostService } from './post.service';

describe('Post Service', () => {
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
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    postService = new PostService(httpClientSpy);
  });

  describe('getPosts()', () => {
    it('should return expected posts when getposts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));

      postService.getPosts().subscribe({
        next: (posts) => {
          // check that posts is equal to POSTS
          expect(posts).toEqual(POSTS);
          done();
        },
        error: () => {
          done.fail;
        },
      });

      // check that the spy was called once
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Post Service using TestBed', () => {
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
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', [
      'get',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  describe('getPosts() ', () => {
    it('should return expected posts when getposts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));

      postService.getPosts().subscribe({
        next: (posts) => {
          // check that posts is equal to POSTS
          expect(posts).toEqual(POSTS);
          done();
        },
        error: () => {
          done.fail;
        },
      });

      // check that the spy was called once
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
