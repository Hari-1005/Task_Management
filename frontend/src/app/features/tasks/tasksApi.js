import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
    reducerPath : "tasksApi",
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_BACKEND_URL,
        credentials : "include",
        tagTypes : ["Tasks"]
    }),

    endpoints : (builder) => ({
        getTasks : builder.query({
            query : () => ({
                url : "api/tasks/",
                method : "GET"
            }),
            providesTags : ["Tasks"]
        }),

        addTask : builder.mutation({
            query : (task) => ({
                url : "api/tasks/create",
                method : "POST",
                body : task
            }),
            invalidatesTags : ["Tasks"]
        }),

        editTask : builder.mutation({
            query : (task) => ({
                url : "api/tasks/" + task.id,
                method : "PATCH",
                body : task.taskData
            }),
            invalidatesTags : ["Tasks"]
        }),

        deleteTask : builder.mutation({
            query : (id) => ({
                url : "api/tasks/" + id,
                method : "DELETE"
            }),
            invalidatesTags : ["Tasks"]
        }),
    })
})

export const { useGetTasksQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = tasksApi;