import { StrengthPipe } from './strength.pipe';

describe('Strength Pipe', () => {
  let pipe: StrengthPipe;

  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display weak if value is 5', () => {
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display strong if value is 15', () => {
    expect(pipe.transform(15)).toEqual('15 (strong)');
  });

  it('should display strongest if value is 30', () => {
    expect(pipe.transform(30)).toEqual('30 (strongest)');
  });
});
