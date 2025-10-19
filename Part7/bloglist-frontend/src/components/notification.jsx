import { Alert, Box, Collapse } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification?.text) return null
  console.log('Notification COMPONENT', notification)
  return (
    <Box sx={{ my: 2 }}>
      <Collapse in={!!notification.text}>
        <Alert
          severity={notification.type === 'error' ? 'error' : 'success'}
          variant="filled"
          sx={{
            borderRadius: 2,
            boxShadow: 2
          }}
        >
          {notification.text}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default Notification
