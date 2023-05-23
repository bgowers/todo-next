"use client";

import { type Todo as TodoType } from "@/api/todos";
import { useDeleteTodo } from "@/app/todos/hooks/useDeleteTodo";
import { FC } from "react";
import { BsTrash } from "react-icons/bs";
import { LoadingSpinner } from "./LoadingSpiner";

type Props = {
  todo: TodoType;
};

export const Todo: FC<Props> = ({ todo }) => {
  const { mutate: deleteTodo, isLoading: isDeleting } = useDeleteTodo();

  return (
    <div className="flex w-full rounded-lg bg-base-300 justify-center shadow-lg p-5">
      <h3 className="flex-grow my-auto">{todo.body}</h3>
      <button className="btn" onClick={() => deleteTodo(todo.id)}>
        {isDeleting ? (
          <LoadingSpinner className="w-6 h-6" />
        ) : (
          <BsTrash className="h-full my-auto fill-red-600" size={30} />
        )}
      </button>
    </div>
  );
};
