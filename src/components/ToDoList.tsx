import { url } from "inspector";
import { useRecoilValue } from "recoil";
import { timeState, toDoSelector, toDoState } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import bg from "../image/image.jpg";
import { totalTime } from "./totalTime";
import { ClockIcon } from "@heroicons/react/outline";

function TodoList() {
  // const [todo, setTodo] = useRecoilState(toDoState);
  const todo = useRecoilValue(toDoState);
  const time = useRecoilValue(timeState);
  const todoSelectorOutput = useRecoilValue(toDoSelector);

  return (
    <div className="w-full" id="ground">
      <div className="w-10/12 mx-auto my-10 p-2">
        <div className="mx-auto lg:w-8/12">
          <div className="flex">
            <h1 className="text-white flex-1">Task List</h1>
            <p className="text-white flex text-xs text-gray-400">
              Today's work time: {totalTime(time)}
            </p>
          </div>
          <CreateTodo />
          <div className="my-3 text-gray-300">{todoSelectorOutput}</div>
        </div>
        <div className="flex flex-wrap w-full h-full pt-2">
          {todo.map((item) => (
            <Todo key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="overflow-hidden w-80 h-80 absolute right-0 bottom-0">
        <ClockIcon className="w-[400px] text-gray-800/70 " />
      </div>
    </div>
  );
}

export default TodoList;
