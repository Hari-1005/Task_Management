import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath : "authApi",
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_BACKEND_URL,
        credentials : "include"
    }),
    endpoints : (builder) => ({
        login : builder.mutation({
            query : (credentials) => ({
                url : "api/user/login",
                method : "POST",
                body : credentials
            })
        }),

        logout : builder.mutation({
            query : () => ({
                url : "api/user/logout",
                method : "GET"
            })
        }),

        getMe : builder.query({
            query : () => ({
                url : "api/user/me",
                method : "GET"
            })
        }),

        register : builder.mutation({
            query : (credentials) => ({
                url : "api/user/register",
                method : "POST",
                body : credentials
            })
        })
    })
})

export const {useLoginMutation, useLogoutMutation, useGetMeQuery, useRegisterMutation} = authApi;