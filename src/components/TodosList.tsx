"use client";

import { type Todo as TodoType } from "@/api/todos";
import React, { FC } from "react";
import { Todo } from "./Todo";

type Props = {
  todos: TodoType[];
};

export const TodosList: FC<Props> = ({ todos }) => {
  if (todos.length === 0) return null;

  return (
    <section className="w-full flex flex-col-reverse gap-4">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
