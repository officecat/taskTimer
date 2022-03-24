import { ITime } from "./atoms";

export const totalTime = (time: ITime[]) => {
  let total = 0;
  time.map((item: ITime) => (total = total + item.end - item.start));
  let hours = Math.floor(total / 3600 / 1000);
  let minutes = Math.floor(total / 60 / 1000) - hours * 60;
  let seconds = Math.floor(total / 1000) - minutes * 60 - hours * 3600;

  return hours
    ? hours + "시간" + minutes + "분" + seconds + "초"
    : minutes
    ? minutes + "분" + seconds + "초"
    : seconds + "초";
};
