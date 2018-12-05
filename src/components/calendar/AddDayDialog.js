import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AddDayDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      date: ""
    };
  }

  render() {
    return (
      <span>
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Or Delete a Day</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="dateInput"
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={this.state.date}
              onChange={e => this.setState({ date: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => {
              this.props.onDelete(this.state.date)
              this.setState({ date: '' })
            }} >
              DELETE
            </Button>
            <Button color="primary" onClick={() => {
              this.props.onConfirm(this.state.date)
              this.setState({ date: '' })
            }}>
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}