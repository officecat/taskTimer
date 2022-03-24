import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px;
  padding: 5px;
  border: none;
`;

const Button = styled.button`
  background-color: skyblue;
  border: none;
  margin: 10px;
  padding: 5px;
  &:hover {
    background-color: royalblue;
    color: white;
  }
`;

const Message = styled.div`
  margin: 0 10px;
  font-size: 11px;
  color: yellow;
  font-style: italic;
`;

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

  const handleValid = ({ toDo }: IForm) => {
    setTodos((oldTodos) => [
      { text: toDo, id: Date.now(), category: "TO_DO", time: [] },
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
