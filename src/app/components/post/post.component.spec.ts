import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostComponent } from './post.component';

xdescribe('Post Component', () => {
  it('should rise ad event when the delete post is clicked', () => {
    const comp = new PostComponent();
    const post: Post = { id: 1, title: 'test', body: 'test body' };
    comp.post = post;

    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));
  });
});

xdescribe('Post Component (TestBed)', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it('should create post component using TestBed', () => {
    expect(comp).toBeDefined();
  });

  it('should rise add event when the delete post is clicked', () => {
    const post: Post = { id: 1, title: 'test', body: 'test body' };
    comp.post = post;

    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));
  });

  it('should render the post title in the anchor element using native element', () => {
    const post: Post = { id: 1, title: 'title 1', body: 'body 1' };
    comp.post = post;

    // will update the data from the component to the template
    fixture.detectChanges();

    // get the anchor element
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');

    expect((a as HTMLAnchorElement).textContent).toContain(post.title);
  });

  it('should render the post title in the anchor element using debug element', () => {
    const post: Post = { id: 1, title: 'title 1', body: 'body 1' };
    comp.post = post;

    // will update the data from the component to the template
    fixture.detectChanges();

    // get the anchor element
    const postDebugElement: DebugElement = fixture.debugElement;
    const aElement = postDebugElement.query(By.css('a')).nativeElement;

    expect((aElement as HTMLAnchorElement).textContent).toContain(post.title);
  });
});
