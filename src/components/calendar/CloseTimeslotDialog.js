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

const initState = {
  open: false,
  dayOfWeek: null,
  date: null,
  time: null,
};

export default class CloseTimeSlotDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = initState
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open })
  }

  handleChange = event => {
    this.setState({ dayOfWeek: event.target.value });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Close TimeSlots</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Close timeSlots on a specific date, by day of the week, or starting at a specific time. You can choose to use any of the three filters.
            </DialogContentText>
            {/* Day of Week */}
            <FormControl>
              <FormLabel style={{ color: "black", marginBottom: "16px", marginTop: "16px" }}>Day of Week:</FormLabel>
              <RadioGroup
                name="position"
                value={this.state.dayOfWeek}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel
                  value="MON"
                  control={<Radio color="primary" />}
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

            <div className="and-divider">OR</div>

            {/* Date Range Input */}
            <div>
              <TextField
                style={{ margin: "8px" }}
                id="name"
                label="Close on Date"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={event => this.setState({ date: event.target.value })}
              />
            </div>
            <div className="and-divider">AND</div>
            {/* Time Range Input */}
            <div>
              <TextField
                style={{
                  margin: "8px",
                  width: "172px"
                }}
                id="name"
                label="Close with Start Time of"
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={event => this.setState({ time: event.target.value })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={_ => {
              this.setState(initState)
              this.props.onDismiss()
            }} color="primary">
              Dismiss
            </Button>
            <Button onClick={_ => {
              const params = { ...this.state }
              delete params.open
              this.props.onConfirm(params)
              this.setState(initState)
            }} color="primary">
              Close Timeslots
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}