import { first } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostComponent } from './post.component';

describe('Post Component', () => {
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
