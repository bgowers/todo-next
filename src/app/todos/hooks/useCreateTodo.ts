import { Todo, createTodo } from "@/api/todos";
import { queryClient } from "@/components/Providers";
import { useMutation } from "@tanstack/react-query";
import { TODOS_QUERY_KEY } from "./useGetTodos";

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>([TODOS_QUERY_KEY]);

      const newTodoItem = {
        id: previousTodos?.[previousTodos.length - 1]?.id || 1,
        body: newTodo,
        isDone: false,
      };

      // Optimistically update to the new value
      queryClient.setQueryData([TODOS_QUERY_KEY], (old?: Todo[]) => [
        ...(old || []),
        newTodoItem,
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
};
