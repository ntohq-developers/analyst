const errorNotification = {
  duration: 5000,
  position: 'is-bottom',
  type: 'is-danger',
  hasIcon: true
}

export const openErrorNotification = (message) => {
  this.$buefy.notification.open({ message, ...errorNotification })
}

export const errorNotificationFactory = (message) => {
  return () => openErrorNotification(message)
}
