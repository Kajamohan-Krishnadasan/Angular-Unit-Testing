import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('Logger Service', () => {
  let loggerService: LoggerService;
  let count: number;

  beforeEach(() => {
    // arrange
    loggerService = new LoggerService();
  });

  it('should not have any messages at starting', () => {
    // act
    count = loggerService.messages.length;

    // assert
    expect(count).toBe(0);
  });

  it('should add the messages when log is called', () => {
    // act
    loggerService.log('message');

    // assert
    count = loggerService.messages.length;
    expect(count).toBe(1);
  });

  it('should clear all the messages when clear is called', () => {
    // arrange
    loggerService.log('message');

    // act
    loggerService.clear();

    // assert
    count = loggerService.messages.length;
    expect(count).toBe(0);
  });
});

describe('Logger Service', () => {
  let service: LoggerService;
  let count: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });

    service = TestBed.inject(LoggerService);
  });

  it('should not have any messages at starting', () => {
    // act
    count = service.messages.length;

    // assert
    expect(count).toBe(0);
  });

  it('should add the messages when log is called', () => {
    // act
    service.log('message');

    // assert
    count = service.messages.length;
    expect(count).toBe(1);
  });

  it('should clear all the messages when clear is called', () => {
    // arrange
    service.log('message');

    // act
    service.clear();

    // assert
    count = service.messages.length;
    expect(count).toBe(0);
  });
});
