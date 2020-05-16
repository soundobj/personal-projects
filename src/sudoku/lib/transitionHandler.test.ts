// @ts-nocheck
import transitionHandler from "./transitionHandler";

describe("transitionHandler", () => {
  const elements = {}; // element instances to trigger events
  const map = {}; // element event map of callbacks
  const addEventListenerMock = jest.fn((event, cb) => {
    map[event] = cb;
  });
  const removeEventListenerMock = jest.fn();

  global.document = {
    querySelector: jest.fn((selector) => {
      const element = {};
      element.addEventListener = addEventListenerMock;
      element.removeEventListener = removeEventListenerMock;
      elements[selector] = {
        map,
      };
      return element;
    }),
  };

  it("listens for all transition events and executes a callback when all resolved", (done) => {
    const event = "animationend";
    const selector = "#foo";
    
    // event name must be unique for mocking purposes
    const event1 = "transitionend";
    const selector1 = "#bar";

    const transitions = [
      {
        event,
        selector,
      },
      {
        event:event1,
        selector:selector1,
      },
    ];

    transitionHandler(transitions).then(() => {
      expect(addEventListenerMock).toHaveBeenCalledTimes(2)
      expect(removeEventListenerMock).toHaveBeenCalledTimes(2)
      done();
    });

    // trigger events to resolve promises
    elements[selector].map[event]();
    elements[selector1].map[event1]();
  });
});
