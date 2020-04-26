import { last } from 'lodash'
import { stopWatch } from './stopWatch'

jest.useFakeTimers();

describe.only ('[stopWatch]',() => {
  it('starts the timer, counts elapsed seconds, pauses the counter, continues after restart and clears the stopWatch when invoking clear()', (done) => {
    const callback = jest.fn();
    const sw = stopWatch()
    sw.setCallback(callback)
    sw.start()
    jest.advanceTimersByTime(3000);
    expect(sw.getElapsedSeconds()).toEqual(3000)
    sw.stop()
    jest.advanceTimersByTime(3000);
    expect(sw.getElapsedSeconds()).toEqual(3000)
    sw.start()
    jest.advanceTimersByTime(3000);
    expect(sw.getElapsedSeconds()).toEqual(6000)
    sw.clear()
    expect(sw.getElapsedSeconds()).toEqual(0)
    done()
  })
  
  it('friendly print the elapsed time in the stopWatch', (done) => {
    const callback = jest.fn();
    const sw = stopWatch()
    sw.setCallback(callback)
    sw.start()
    jest.advanceTimersByTime(3775000); // 1 hour, 2 minutes and 55 seconds
    sw.stop()
    const expected = last(callback.mock.calls)[0]
    expect(expected).toStrictEqual({"ISOString": "01:02:55", "elapsedTime": 3775000})
    done()
  })
})