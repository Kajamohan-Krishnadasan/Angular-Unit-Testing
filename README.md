# AngularUnitTesting

## Default README.md

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Angular Unit Testing

### Introduction

- Two types of unit tests

  - Isolated unit tests : Test a single component/function
  - Integrated unit tests: Test a component with its dependencies

- units that can be tested in isolation

  - Components
  - Services
  - Pipes
  - Class
  - Directives

- Automated testing

  - Unit testing : testing a single unit of code
  - End-to-end testing (E2E) : testing against a live running application
  - Integration/Fuction testing : more than one unit of code and less than the whole application

- Mocking

  - Mocking is the process of creating objects that simulate the behavior of real objects

  - Mocks types
    - Dummies : used to create a dummy object
    - Stubs : it will take the control of the method and return a value
    - Spies : it will spy on the method and how many times it is called will store.

- create Angular Project

  - **ng new Angular-Project-Name**

- create a service file

  - **ng g s services/Service-Name**

- set watch mode

  - **ng test --watch**

  - or modify package.json
  - **"test": "ng test --watch"**

- pending the unit test

  - pending() : it is used to ignore the unit test
    - **it('should be true',() =>{ pending(); });**
  - xit() : it is used to ignore the unit test
    - **xit('should be true', () => { expect(true).toBe(true); });**

- fail the unit test
  - fail() : it is used to fail the unit test
    - **it('should be true',() =>{ fail(); });**

### stop creating original service in the test file

<!--
/**
   * here the original LoggerService is called
   * stop this we need to create a mock service
   * spyOn(loggerService, 'log')
   */
  // let loggerService = new LoggerService();

  // instance for the calculator service
  // let calculator = new CalculatorService(); // this not valid because this is depend on LoggerService
  // let calculator = new CalculatorService(loggerService);

  let result;

  // test add method
  it('should add two numbers', () => {
    // let loggerService = new LoggerService();  // original LoggerService is called
    let loggerService = jasmine.createSpyObj('LoggerService', ['log']); // mock LoggerService is called

    let calculator = new CalculatorService(loggerService);

    // spyOn(loggerService, 'log'); // this not needed because we are using mock LoggerService

    result = calculator.add(2, 2);

    expect(result).toEqual(4);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
-->

- create a mock service
- let loggerService = new LoggerService(); // original service
- let loggerService = jasmine.createSpyObj('LoggerService', ['log']); // mock LoggerService is called

### testing pipes

- create a pipe file
- **ng g p pipes/pipe-name**

- call the pipe in the component in the test
- **let pipe = new PipeNamePipe();**

<!--
// in the strength.pipe.ts file
export class StrengthPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 10) {
      return value + '(weak)';
    } else if (value >= 10 && value < 20) {
      return value + '(strong)';
    } else {
      return `${value} (strongest)`;
    }
  }
}

// in the strength.pipe.spec.ts file

import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('should display weak if value is 5', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display strong if value is 15', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(15)).toEqual('15 (strong)');
  });

  it('should display strongest if value is 30', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(30)).toEqual('30 (strongest)');
  });

 -->

### create a component

- **ng g c components/component-name**

### test post Component

<!--
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

/*****************************************/

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
-->

### testing component having input and output

<!--
/*
* here we are only testing typescript code not the html
*/
// in the post.component.ts file
export class PostComponent {
  @Input() post!: Post;

  @Output() delete = new EventEmitter<Post>();

  onDeletePost(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.post);
  }
}

// in the post.component.spec.ts file
it('should rise ad event when the delete post is clicked', () => {
    const comp = new PostComponent();
    const post: Post = { id: 1, title: 'test', body: 'test body' };
    comp.post = post;

    comp.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));
  });
 -->
