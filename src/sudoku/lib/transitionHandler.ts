export type Transition = {
  event: "animationend" | "transitionend";
  selector: string;
};

const transitionHandler = (events: Transition[]): Promise<unknown> =>
  Promise.all(
    events.map((transition: Transition) => {
      const { event, selector } = transition;
      return new Promise((resolve) => {
        const onTransitionEnd = () => {
          const element = document.querySelector(selector);
          element && element.removeEventListener(event, onTransitionEnd);
          resolve();
        };
        const transition = document.querySelector(selector);
        transition?.addEventListener(event, onTransitionEnd);
      });
    })
  );

export default transitionHandler;
