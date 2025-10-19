import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Collapse, Box, Paper } from '@mui/material'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(prev => !prev)

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <Box>
      {!visible && (
        <Button variant="contained" color="primary" onClick={toggleVisibility} sx={{ mb: 2 }}>
          {buttonLabel}
        </Button>
      )}

      <Collapse in={visible}>
        <Paper sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 1 }}>
          {children}
          <Box mt={2}>
            <Button variant="outlined" color="secondary" onClick={toggleVisibility}>
              Cancel
            </Button>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  )
})

export default Togglable
