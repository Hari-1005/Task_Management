import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name : "filter",
    initialState : {
        activePriority: null,
        activeSort  : null,
    },
    reducers : {
        setActivePriority  : (state, action) => {
            state.activePriority  = action.payload;
        },
        setActiveSort : (state, action) => {
             console.log('Setting order to:', action.payload);
            state.activeSort   = action.payload;
        }
    }
})

export const {setActivePriority, setActiveSort} = filterSlice.actions;
export default filterSlice.reducer;

