import { atom, selector } from "recoil";

export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: [], _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface ITodo {
  id: number;
  text: string;
  category: "DONE" | "DOING" | "TO_DO";
  time: ITime[];
}

export interface ITime {
  id: number;
  start: number;
  end: number;
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("TODO")],
});

export const timeState = atom<ITime[]>({
  key: "workTime",
  default: [],
  effects: [localStorageEffect("TIME")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    return "This is selector";
  },
});
