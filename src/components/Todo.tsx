import { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, localStorageEffect, timeState, toDoState } from "./atoms";
import Draggable from "react-draggable";
import { PencilIcon, ClockIcon, XIcon } from "@heroicons/react/outline";
import { PlayIcon, StopIcon } from "@heroicons/react/solid";
import { totalTime } from "./totalTime";

const Li = styled.li`
  padding: 5px 10px;
  width: 150px;
  min-height: 150px;
  background-color: whitesmoke;
  color: black;
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  border: none;
  margin: 0 5px;
  padding: 5px;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

function Todo({ text, category, id, time }: ITodo) {
  const nodeRef = useRef(null);
  const [start, setStart] = useState(0);
  const [timeId, setTimeId] = useState(time.length);
  const setToDos = useSetRecoilState(toDoState);
  const [times, setTimes] = useRecoilState(timeState);

  const createdDay =
    (new Date(id).getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    new Date(id).getDate().toString().padStart(2, "0") +
    " " +
    new Date(id).getHours().toString().padStart(2, "0") +
    ":" +
    new Date(id).getMinutes().toString().padStart(2, "0") +
    ":" +
    new Date(id).getSeconds().toString().padStart(2, "0");

  const startCount = () => {
    if (start !== 0) {
      setToDos((oldTodos) => {
        const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
        const newTime = { id: timeId, start: start, end: Date.now() };
        const newTimeArray = [
          ...oldTodos[targetIndex].time.slice(0, timeId - 1),
          newTime,
        ];
        const newToDo = { text, id, category, time: newTimeArray };
        return [
          ...oldTodos.slice(0, targetIndex),
          newToDo,
          ...oldTodos.slice(targetIndex + 1),
        ];
      });
      setStart(0);

      //Today's Total Work

      if (times.length === 0) {
        return setTimes((oldTodos) => [
          { id: start, start, end: Date.now() },
          ...oldTodos,
        ]);
      } else if (
        new Date().getDate() === new Date(times[times.length - 1].id).getDate()
      ) {
        return setTimes((oldTodos) => [
          { id: start, start: start, end: Date.now() },
          ...oldTodos,
        ]);
      } else return localStorage.removeItem("TIME");
    }
    setTimeId((prev) => prev + 1);
    setStart(Date.now());
  };

  const onClick = (newCategory: ITodo["category"]) => {
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldTodos[targetIndex];
      const newToDo = { text, id, category: newCategory, time };
      return [
        ...oldTodos.slice(0, targetIndex),
        newToDo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteTask = () => {
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldTodos.slice(0, targetIndex),
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  // const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const {
  //     currentTarget: { name },
  //   } = event;
  //   setToDos((oldTodos) => {
  //     const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
  //     const oldToDo = oldTodos[targetIndex];
  //     const newToDo = { text, id, category: name as any };
  //     return [
  //       ...oldTodos.slice(0, targetIndex),
  //       newToDo,
  //       ...oldTodos.slice(targetIndex + 1),
  //     ];
  //   });
  // };

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        id={id.toString()}
        ref={nodeRef}
        className="bg-yellow-300 w-40 border border-yellow-400 h-fit group shadow-lg m-0.5"
      >
        <div
          className="absolute hover:bg-yellow-400 right-1 hover:cursor-pointer"
          onClick={deleteTask}
        >
          <XIcon className="inline-block h-4 text-yellow-600" />
        </div>
        {category === "DONE" ? (
          <div className="text-black p-2 break-all line-through ">{text}</div>
        ) : category === "TO_DO" ? (
          <div className="text-black p-2 break-all">{text}</div>
        ) : (
          <div className="text-black font-bold p-2 break-all">{text}</div>
        )}

        <div className="text-yellow-600 px-2 break-all text-xs">
          <PencilIcon className=" inline-block h-4 mr-0.5" />
          {createdDay}
        </div>

        <div className="text-yellow-600 px-2 break-all text-xs mb-1">
          <ClockIcon className="align-middle inline-block h-4 mr-0.5" />
          <span className="align-middle">{totalTime(time)}</span>
        </div>

        <div className="border-t border-dashed border-yellow-600 pt-1 pl-1">
          {category !== "TO_DO" && (
            <button
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-600/20 border p-1 px-2 text-xs font-bold rounded-full mr-1"
              name="TO_DO"
              onClick={() => onClick("TO_DO")}
            >
              To-do
            </button>
          )}
          {category !== "DOING" && (
            <button
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-600/20 border p-1 px-2 text-xs font-bold rounded-full mr-1"
              name="DOING"
              onClick={() => onClick("DOING")}
            >
              Doing
            </button>
          )}
          {category !== "DONE" && (
            <button
              name="DONE"
              onClick={() => onClick("DONE")}
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-600/20 border p-1 px-2 text-xs font-bold rounded-full mr-1"
            >
              Done
            </button>
          )}
          <div
            className="text-yellow-500 break-all text-xs inline-block "
            onClick={startCount}
          >
            {start === 0 ? (
              <>
                <PlayIcon className="align-middle inline-block h-8  mb-1 hover:text-yellow-600" />
                {/* <span className="align-middle">Start!</span> */}
              </>
            ) : (
              <>
                <StopIcon className="align-middle inline-block h-8  mb-1 hover:text-yellow-600" />
                {/* <span className="align-middle">Progressing...</span> */}
              </>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Todo;
