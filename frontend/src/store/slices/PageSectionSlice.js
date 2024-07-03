import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    pageName:'',
    Properties:[],
}

const PageSectionSlice = createSlice({
    name: 'pageName',
    initialState,
    reducers:{
        changePage:(state,action)=>{
            return { ...state, pageName: action.payload};
        },
        setProperties:(state,action)=>{
            return { ...state, Properties: action.payload};
        },
        clearProperties:(state)=>{
            return { ...state, Properties: []};
        }
    }
})

export const { changePage, setProperties, clearProperties } = PageSectionSlice.actions;
export default PageSectionSlice.reducer;