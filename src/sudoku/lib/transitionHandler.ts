import { Cell } from "./definitions";
import { random, isEmpty, curryRight } from "lodash";

export type Transition = {
  event: "animationend" | "transitionend";
  selector: string;
};

export const transitionHandler = (events: Transition[]): Promise<unknown> =>
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

export type BoardCellClasses = (string | undefined)[][]

export interface MapRandomItemToList {
  list: BoardCellClasses
  applied: string[]
}

export const mapRandomItemToList = (
  list: any[],
  items: string[],
  criteria: (item: any) => boolean
): MapRandomItemToList => {
  if (isEmpty(list) || isEmpty(items)) {
    return {
      list: [],
      applied: []
    }
  }
  const appliedItems: Record<string, boolean> = {};
  const _list = list.map((x) =>
    x.map((item: any) => {
      if (criteria(item)) {
        const randomItem = items[random(0, list.length - 1)];
        appliedItems[randomItem] = true;
        return randomItem;
      } else {
        return undefined;
      }
    })
  );

  return {
    list: _list,
    applied: Object.keys(appliedItems)
  }
};

export const filterCellByAutogeneratedOrValueEntered = (cell: Cell): boolean =>
cell.autogenerated === true ||
  cell.hasOwnProperty('value')

export const mapRandomClassToVisibleCellsInBoard = curryRight(mapRandomItemToList)(filterCellByAutogeneratedOrValueEntered)
