import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { PostService } from '../../services/Post/post.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('Post Details Component', () => {
  let fixture: ComponentFixture<PostDetailComponent>;
  let component: PostDetailComponent;
  let mockPostService: jasmine.SpyObj<PostService>;

  beforeEach(() => {
    // here we create a mock ActivatedRoute object using the snapshot property
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: Location,
          useValue: mockLocation,
        },
        {
          provide: PostService,
          useValue: mockPostService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    });
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it('should render the post title in the h2 tag', () => {
    mockPostService.getPost.and.returnValue(
      of({
        id: 3,
        title: 'Test Title 3',
        body: 'Test Body 3',
      } as Post)
    );

    fixture.detectChanges();

    // method 1
    const element1 = fixture.debugElement.query(By.css('h2'))
      .nativeElement as HTMLElement;

    expect(element1.textContent).toContain(
      fixture.componentInstance.post.title
    );

    // method 2
    const element2 = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(element2.textContent).toContain(
      fixture.componentInstance.post.title
    );
  });
});
