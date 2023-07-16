import { useSelector } from 'react-redux'

const Notification = () => {
  // retrieve state from store
  const message = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }

  return <div className="notification">{message}</div>
}

export default Notification
