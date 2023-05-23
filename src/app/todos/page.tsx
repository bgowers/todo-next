"use client";

import { Input } from "@/components/Input";
import { useGetTodos } from "./hooks/useGetTodos";
import { useCreateTodo } from "./hooks/useCreateTodo";
import { FormEvent, useState } from "react";
import { TodosList } from "@/components/TodosList";
import { LoadingSpinner } from "@/components/LoadingSpiner";

const TodosPage = () => {
  const {
    data: todos,
    isLoading: isLoadingTodos,
    isFetching: isFetchingTodos,
  } = useGetTodos();
  const { mutate: createTodo, isLoading: isCreatingTodo } = useCreateTodo();
  const [newTodoText, setNewTodoText] = useState("");

  const addNewTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoText) return;

    createTodo(newTodoText.trim());
    setNewTodoText("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-base-100 prose min-w-full m-auto">
      <h1 className="mb-4">Todos</h1>
      <Input
        onSubmit={addNewTodo}
        onChange={(e) => setNewTodoText(e.target.value)}
        value={newTodoText}
        className="my-8"
        isLoading={isCreatingTodo}
      />
      {isFetchingTodos && !isLoadingTodos && <p>Refreshing todos...</p>}
      {isLoadingTodos && <LoadingSpinner className="w-28 h-28 mt-20" />}
      {todos && <TodosList todos={todos} />}
    </main>
  );
};

export default TodosPage;
