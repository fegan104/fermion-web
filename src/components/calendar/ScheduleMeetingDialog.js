import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ScheduleMeetignDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: "",
      open: false,
      guest: "",
      startTime: "",
      endTime: "",
      date: "",
    };
  }

  componentWillReceiveProps(newProps) {
    const { timeSlot, date } = newProps
    this.setState({
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      date
    });
  }

  render() {
    return (
      <span>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Schedule a meeting</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="dateInput"
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.date}
              onChange={e => this.setState({ date: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="startTimeInput"
              label="Start Time"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.startTime}
              onChange={e => this.setState({ startTime: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="endTimeInput"
              label="End Time"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.endTime}
              onChange={e => this.setState({ endTime: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="guestInput"
              label="Guest"
              fullWidth
              value={this.state.guest}
              onChange={e => this.setState({ guest: e.target.value })}
            />
            <TextField
              autoFocus
              margin="dense"
              id="locationInput"
              label="Location"
              fullWidth
              value={this.state.location}
              onChange={e => this.setState({ location: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.onConfirm()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {
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