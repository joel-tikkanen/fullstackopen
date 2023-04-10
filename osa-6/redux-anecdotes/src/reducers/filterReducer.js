import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
  
const filterSlicer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter(state, action){
            return action.payload
        }
    }

})

export const { changeFilter  } = filterSlicer.actions
export default filterSlicer.reducer