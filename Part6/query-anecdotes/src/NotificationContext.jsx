import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATED":
      return `anecdote "${action.payload}" created`
    case "VOTED":
      return `anecdote "${action.payload}" voted`
    case "ERROR":
      return "too short anecdote, must have length 5 or more"
    case "CLEAR":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}



export default NotificationContext