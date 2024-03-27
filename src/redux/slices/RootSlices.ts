import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        filename: '',
    },
    reducers: {
        
        chooseFilename: (state, action) => {
            state.filename = action.payload;
        },
    },
});

export const reducer = rootSlice.reducer;
export const { chooseFilename } = rootSlice.actions;
