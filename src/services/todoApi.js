import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6827d9996b7628c529117dff.mockapi.io' }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['todos'],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['todos'],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['todos'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
