import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
  
const notificationSlicer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action){
            return action.payload
        }
    }

})

export const { setMessage } = notificationSlicer.actions

export const setNotification = (content, time) => {
    return  (dispatch, getState) => {
        dispatch(setMessage(content))
        setTimeout(() => dispatch(setMessage('')), time*1000)
    }
}

export default notificationSlicer.reducer