import axios from "axios";

const API_BASE_URL = "http://localhost:3005";

export type Todo = {
  id: number;
  body: string;
  isDone: boolean;
};

export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(API_BASE_URL);

  return res.data;
};

export const createTodo = async (body: string) => {
  await axios.post(API_BASE_URL, {
    body,
  });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
