import { createSlice } from "@reduxjs/toolkit";

const init = {
    darkmatter: true,
    title: null,
    description: null,
    icon: null,
    timeout: 5000,
    callback: null,
    color: "black",
    bgcolor: "white",
    position: "bottom_right",
    readonly: false,
}

const Toastslice = createSlice({
    name:"toast",
    initialState: init,
    reducers:{
        showtoast(state, actions){
            state.darkmatter = false,
            state.title = actions.payload.title,
            state.readonly = actions.payload.readonly,
            state.description = actions.payload.description,
            state.icon = actions.payload.icon,
            state.timeout = actions.payload.timeout,
            state.callback = actions.payload.callback,
            state.color = actions.payload.color,
            state.bgcolor = actions.payload.bgcolor,
            state.position = actions.payload.position
        },
        hidetoast(state){
            state.darkmatter = true,
            state.title = null,
            state.icon = null,
            state.readonly = false,
            state.description = null,
            state.timeout = 2000,
            state.callback = null,
            state.color = "white",
            state.bgcolor = "black",
            state.position = "bottom-right"
        },
    },
})


export const {showtoast, hidetoast} = Toastslice.actions

export default Toastslice.reducer