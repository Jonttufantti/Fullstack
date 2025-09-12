const Notification = ({ notification }) => {
  if (!notification.text) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.text}
    </div>
  )
}

export default Notification
