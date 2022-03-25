import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, timeState, toDoSelector, toDoState } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { totalTime } from "./totalTime";
import { ClockIcon } from "@heroicons/react/outline";
import React from "react";

function TodoList() {
  // const [todo, setTodo] = useRecoilState(toDoState);
  // const todo = useRecoilValue(toDoState);
  const time = useRecoilValue(timeState);
  const list = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div className="w-full">
      <div className="w-10/12 lg:w-8/12 mx-auto my-10 p-2">
        <div className="mx-auto ">
          <div className="flex align-middle">
            <h1 className="text-white mr-4 pt-0.5">Task List</h1>

            <p className=" ml-auto text-xs text-gray-400">
              Today's work time: {totalTime(time)}
            </p>
          </div>

          <CreateTodo />
        </div>
        <select
          value={category}
          onInput={onInput}
          className="bg-gray-800 focus:outline-none text-gray-400 my-3"
        >
          <option value="TO_DO">To do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
        </select>
        <hr className="" />
        {/* <h2 className="text-sm mt-2">{category}</h2> */}
        <div className="flex flex-wrap w-full h-full pt-2">
          {list.map((item) => (
            <Todo key={item.id} {...item} />
          ))}
        </div>
      </div>
      <div className="overflow-hidden w-80 h-80 absolute right-0 bottom-0 -z-50">
        <ClockIcon className="w-[400px] text-gray-800" />
      </div>
    </div>
  );
}

export default TodoList;
