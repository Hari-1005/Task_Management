import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice.js"
import tasksReducer from "./features/tasks/tasksSlice.js"
import filterReducer from "./features/filter/filterSlice.js"
import { authApi } from "./features/auth/authApi"
import { tasksApi } from "./features/tasks/tasksApi.js"
import { setupListeners } from "@reduxjs/toolkit/query"

const store = configureStore({
    reducer : {
        auth : authReducer,
        tasks : tasksReducer,
        filter : filterReducer,
        [authApi.reducerPath] : authApi.reducer,
        [tasksApi.reducerPath] : tasksApi.reducer
    },

    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, tasksApi.middleware)
})

setupListeners(store.dispatch)

export default store