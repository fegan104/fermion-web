import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';

export default class ScheduleMeetignDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "",
      open: false,
      guest: "",
      time: "",
      date: "",
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <span>
        <Icon className="action-icon" onClick={this.handleClickOpen}>edit</Icon>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="dateInput"
              label="Date"
              type="date"
              fullWidth
              value={this.state.date}
            />
            <TextField
              autoFocus
              margin="dense"
              id="timeInput"
              label="Time"
              type="time"
              fullWidth
              value={this.state.time}
            />
            <TextField
              autoFocus
              margin="dense"
              id="guestInput"
              label="Guest"
              fullWidth
              value={this.state.guest}
            />
            <TextField
              autoFocus
              margin="dense"
              id="locationInput"
              label="Location"
              fullWidth
              value={this.state.location}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
              this.handleClose()
              this.props.onConfirm({
                calendarId: this.props.calendarId,
                date: this.state.date,
                startTime: this.state.time,
                location: this.state.location,
                guest: this.state.guest
              })
            }} color="primary">
              SCHEDULE
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}