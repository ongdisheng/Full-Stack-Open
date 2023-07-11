import { createContext, useContext, useReducer } from 'react'

// define reducer function
const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

// context
const NotificationContext = createContext()

// context provider
export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

// helper function (custom hook)
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext