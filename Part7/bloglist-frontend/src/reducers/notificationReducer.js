import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { text: null, type: null },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return { text: null, type: null }
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotificationFor = (message, type = 'success', seconds = 5) => {
  return async dispatch => {
    dispatch(setNotification({ text: message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
