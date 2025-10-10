import { createSlice, current } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notifications',
    initialState: 'Notifikaatio',
    reducers: {
        showNotification(state, action) {
            console.log('State', current(state))
            return state
        }
    }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer