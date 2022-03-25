import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateTodo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const handleValid = ({ toDo }: IForm) => {
    setTodos((oldTodos) => [
      { text: toDo, id: Date.now(), category, time: [] },
      ...oldTodos,
    ]);
    setValue("toDo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValid)} className="flex w-full mt-2">
        <input
          {...register("toDo", { required: "Please write a to do" })}
          placeholder="Write a to do"
          className="text-black appearance-none focus:outline-none p-2 focus:ring-0 grow"
        />
        <button className="bg-slate-600 hover:bg-slate-500 text-white p-2 w-20">
          Add
        </button>
      </form>
      <div className="text-xs text-yellow-500 italic my-1">
        {errors?.toDo?.message}
      </div>
    </>
  );
}

export default CreateTodo;
