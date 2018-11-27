import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class CloseTimeSlotDialog extends React.Component {
  state = {
    open: false,
    dayOfWeek: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ dayOfWeek: event.target.value });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Close timeSlots inside a date range, by day of the week, or within a range of times.
            </DialogContentText>

            <FormControl>
              <FormLabel style={{ color: "black", marginBottom:"16px", marginTop:"16px" }}>Day of Week:</FormLabel>
              <RadioGroup
                name="position"
                value={this.state.dayOfWeek}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel
                  value="MON"
                  control={<Radio color="primary"/>}
                  label="MON"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="TUE"
                  control={<Radio color="primary" />}
                  label="TUE"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="WED"
                  control={<Radio color="primary" />}
                  label="WED"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="THU"
                  control={<Radio color="primary" />}
                  label="THU"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="FRI"
                  control={<Radio color="primary" />}
                  label="FRI"
                  labelPlacement="top"
                />

              </RadioGroup>
            </FormControl>

            {/* Date Range Input */}
            <div>
              <TextField
                style={{ margin: "8px" }}
                id="name"
                label="Date Range Start"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                style={{ margin: "8px" }}
                id="name"
                label="Date Range End"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>

            {/* Time Range Input */}
            <div>
              <TextField
                style={{
                  margin: "8px",
                  width: "172px"
                }}
                id="name"
                label="Time Range Start"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                style={{
                  margin: "8px",
                  width: "172px"
                }}
                id="name"
                label="Time Range End"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Dismiss
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Close Timeslots
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}