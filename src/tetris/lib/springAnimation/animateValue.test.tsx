import {
  animateValue,
} from './animateValue';

jest.useFakeTimers();

describe('animateValue', () => {
  it('animates values linearly', () => {
    const mockFn = jest.fn();
    const callback = (value: number, stepTime: number) => {
      mockFn(value, stepTime);
    }; 
    animateValue(0, 10, 1200, callback)
    jest.runAllTimers();
    expect(mockFn).toBeCalledTimes(12);
    expect(mockFn).nthCalledWith(1, 0, 0);
    expect(mockFn).nthCalledWith(3, 1, 120);
  });
});