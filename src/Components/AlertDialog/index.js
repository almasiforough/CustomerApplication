import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CircularProgress } from '@material-ui/core'

export default function AlertDialog({
  isOpen,
  onClose,
  title,
  dialogText,
  onAcceptClicked,
  loading
}) {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={onAcceptClicked}
            color="primary"
            variant="contained"
            autoFocus
            disabled={loading}
          >
            Yes
            {loading && <CircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
