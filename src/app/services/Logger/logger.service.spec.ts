import { LoggerService } from './logger.service';

xdescribe('Logger Service', () => {
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
