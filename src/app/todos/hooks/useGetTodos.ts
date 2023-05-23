import { getTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

export const TODOS_QUERY_KEY = "todos";

export const useGetTodos = () =>
  useQuery({ queryKey: [TODOS_QUERY_KEY], queryFn: getTodos });
