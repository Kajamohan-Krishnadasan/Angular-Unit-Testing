import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../Logger/logger.service';
import { CalculatorService } from './calculator.service';

describe('Calculator Service', () => {
  let loggerService: any;
  let calculator: CalculatorService;
  let result;

  /**
   * here the original LoggerService is called
   * stop this we need to create a mock service
   * spyOn(loggerService, 'log')
   */
  // loggerService = new LoggerService();

  // instance for the calculator service
  // calculator = new CalculatorService(); // this not valid because this is depend on LoggerService
  // calculator = new CalculatorService(loggerService);

  beforeEach(() => {
    // console.log('beforeEach in Calculator Service');
    // loggerService = new LoggerService();  // original LoggerService is called
    loggerService = jasmine.createSpyObj('LoggerService', ['log']); // mock LoggerService is called

    calculator = new CalculatorService(loggerService);

    // spyOn(loggerService, 'log'); // this not needed because we are using mock LoggerService
  });

  // test add method
  it('should add two numbers', () => {
    // console.log('test add method in Calculator Service');

    result = calculator.add(2, 2);
    expect(result).toEqual(4);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });

  // test subtract method
  it('should subtract two numbers', () => {
    // console.log('test subtract method in Calculator Service');

    result = calculator.subtract(2, 2);
    expect(result).toEqual(0);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
});

describe('Calculator Service using TestBed (method 1)', () => {
  let mockLoggerService: any;
  let calculator: CalculatorService;
  let result;

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']); // mock LoggerService is called

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    });

    calculator = TestBed.inject(CalculatorService);
  });

  // test add method
  it('should add two numbers', () => {
    result = calculator.add(2, 2);
    expect(result).toEqual(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  // test subtract method
  it('should subtract two numbers', () => {
    result = calculator.subtract(2, 2);
    expect(result).toEqual(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});

function setUp() {
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']); // mock LoggerService is called

  TestBed.configureTestingModule({
    providers: [
      CalculatorService,
      {
        provide: LoggerService,
        useValue: mockLoggerService,
      },
    ],
  });

  const calculator = TestBed.inject(CalculatorService);
  const loggerServiceSpy = TestBed.inject(
    LoggerService
  ) as jasmine.SpyObj<LoggerService>;

  return { calculator, loggerServiceSpy };
}

describe('Calculator Service using TestBed (method 2)', () => {
  let result;

  // test add method
  it('should add two numbers', () => {
    const { calculator, loggerServiceSpy } = setUp();

    result = calculator.add(2, 2);
    expect(result).toEqual(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  // test subtract method
  it('should subtract two numbers', () => {
    const { calculator, loggerServiceSpy } = setUp();

    result = calculator.subtract(2, 2);
    expect(result).toEqual(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});
