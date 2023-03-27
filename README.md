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

```\
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
```

- create a mock service
- let loggerService = new LoggerService(); // original service
- let loggerService = jasmine.createSpyObj('LoggerService', ['log']); // mock LoggerService is called

### testing pipes

- create a pipe file
- **ng g p pipes/pipe-name**

- call the pipe in the component in the test
- **let pipe = new PipeNamePipe();**

```\
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
```

### create a component

- **ng g c components/component-name**

### test post Component

```\
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
```

### testing component having input and output

```\
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
```

### TestBed to test component

- the module is used to test the component
- this will handle all the dependencies of the component

```\
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

```

### Declaring a angular TestBed (ATB)

- Testbed.configureTestingModule(): it is used to configure the testbed

  - **Testbed.configureTestingModule({**
    **declarations: [ComponentName],**
    **providers: [ServiceName],**
    **})**

- fixture: it is used to create the component

  - **const fixture = TestBed.createComponent(ComponentName);**

- component: it is used to get the instance of the component

  - **cosnt component = fixture.componentInstance;**
  - this will give all access to properties and methods of the component

- check the component is created or not

  - **expect(component).toBeDefined();**

- example code: post.component.spec.ts

  ```\
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });
  ```

### TestBed to test native element and debug element

- nativeElement: it is used to get the html element

- method 1 (using fixture.nativeElement)

  ```\
    it('should have paragraph with "Kajamohan"',()=>{
      const bannerElement: HTMLElement = fixture.nativeElement;
      const p = bannerElement.querySelector('p');

      expect(p.textContent).toEqual('Kajamohan');
    })
  ```

- method 2 (using debugElement)

  ```\
    it('should have paragraph with "Kajamohan"',()=>{

      const bannerDebugElement: DebugElement = fixture.debugElement;

      const bannerElement: HTMLElement = bannerDebugElement.nativeElement;

      const p = bannerElement.querySelector('p');

      expect(p.textContent).toEqual('Kajamohan');

    })
  ```

  - method 3 (using By.css)
  - this is the best method to get the element

  ```\
   it('should have paragraph with "Kajamohan"',()=>{

     const bannerDebugElement: DebugElement = fixture.debugElement;

     const paragraphDebug = bannerDebugElement.query(By.css('p'));

     const paragraphElement: HTMLElement = paragraphDebug.nativeElement;

     expect(paragraphElement.textContent).toEqual ('Kajamohan');

   })
  ```

### Access the template of the component using the nativeElement

```\
  it('should render the post title in the anchor element using debug element', () => {
    const post: Post = { id: 1, title: 'title 1', body: 'body 1' };
    comp.post = post;

    // will update the data from the component to the template
    fixture.detectChanges();

    // get the anchor element
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');

    expect((a as HTMLAnchorElement).textContent).toContain(post.title);
  });
```

### Access the template of the component using the debugElement

```\
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
```

### checking the component class and compained with a template

- **component.ngOnInit();** or **fixture.detectChanges();** are same

  - if any error add below lines in the beforeEach() method.

    ```\
    TestBed.configureTestingModule({
     declarations: [PostsComponent],
     providers: [
       {
         provide: PostService,
         useValue: mockPostService,
       },
     ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    ```

### TestBed.configureTestingModule() method

- **declarations**: it is used to declare the component
- **providers**: it is used to provide the service

  - **provide**: it is used to provide the service
  - **useValue**: it is used to provide the mock service
  - **useClass**: it is used to provide the service class

- **imports**: it is used to import the module
- **schemas**: it is used to declare the custom elements

```\
TestBed.configureTestingModule({
  declarations: [PostsComponent],
  providers: [
    {
      provide: PostService,
      useValue: mockPostService,
    },
  ],
  imports: [HttpClientModule],
  schemas: [NO_ERRORS_SCHEMA],
});
```

### Testing the child component using the TestBed

```\
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

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();

    const debugElements = fixture.debugElement;
    const postsElement = debugElements.queryAll(By.css('.posts-div'));

    expect(postsElement.length).toBe(POSTS.length);
  });


```
