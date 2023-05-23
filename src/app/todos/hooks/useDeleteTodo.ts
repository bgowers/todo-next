import { Todo, deleteTodo } from "@/api/todos";
import { queryClient } from "@/components/Providers";
import { useMutation } from "@tanstack/react-query";
import { TODOS_QUERY_KEY } from "./useGetTodos";

export const useDeleteTodo = () =>
  useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [TODOS_QUERY_KEY] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>([TODOS_QUERY_KEY]);

      // Optimistically update to the new value
      queryClient.setQueryData([TODOS_QUERY_KEY], (old?: Todo[]) =>
        old?.filter((todo) => todo.id !== id)
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] }),
  });
