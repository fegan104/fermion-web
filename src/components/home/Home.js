import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadAllCalendars, addCalendar } from '../../actions/CalendarActions'
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";


const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: 360
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: 8
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarName: '',
      startHour: '',
      endHour: '',
      startDate: '',
      endDate: '',
      duration: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(loadAllCalendars())
  }

  renderCalendarLinks() {
    const cals = this.props.calendars.length === 0
      ? (<div>No calendars</div>)
      : this.props.calendars.map(c =>
        <li key={c.id}><Link to={`calendar/${c.id}`}>{c.name}</Link></li>
      )

    const calsView = this.props.calendars.length === 0 ? cals : (
      <div>
        Calendars:
          <ul>
          {cals}
        </ul>
      </div>
    )

    return calsView
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          {this.renderCalendarLinks()}
          <p></p>
          <div>
            <form className={classes.root} autoComplete="off">

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="name-input">Calendar Name</InputLabel>
                <FilledInput
                  id="name-input"
                  value={this.state.calendarName}
                  placeholder="calendar name"
                  onChange={e => this.setState({ calendarName: e.target.value })} />
              </FormControl>

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel
                  ref={ref => { this.InputLabelRef = ref }}
                  htmlFor="start-hour-input">Start Hour</InputLabel>

                <Select
                  value={this.state.startHour}
                  onChange={e => this.setState({ startHour: e.target.value })}
                  input={<FilledInput id="start-hour-input" />}>

                  <MenuItem value=""><em>None</em></MenuItem>
                  {[...Array(24)].map((x, i) =>
                    <MenuItem key={i} value={i}>{i}:00</MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="end-hour-input">End Hour</InputLabel>
                <Select
                  value={this.state.endHour}
                  onChange={e => this.setState({ endHour: e.target.value })}
                  input={<FilledInput id="end-hour-input" />}>

                  <MenuItem value=""><em>None</em></MenuItem>
                  {[...Array(23)].map((x, i) =>
                    <MenuItem key={i} value={i + 1}>{i + 1}:00</MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="start-date-input" shrink>Start Date</InputLabel>
                <FilledInput
                  id="start-date-input"
                  type="date"
                  value={this.state.startDate}
                  placeholder="Start date"
                  onChange={e => this.setState({ startDate: e.target.value })} />
              </FormControl>

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="end-date-input" shrink>End Date</InputLabel>
                <FilledInput
                  id="end-date-input"
                  type="date"
                  value={this.state.endDate}
                  placeholder="End date"
                  onChange={e => this.setState({ endDate: e.target.value })} />
              </FormControl>

              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="duration-input">Duration</InputLabel>
                <Select
                  value={this.state.duration}
                  onChange={e => this.setState({ duration: e.target.value })}
                  input={<FilledInput id="duration-input" />}>

                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={10}>10 minutes</MenuItem>
                  <MenuItem value={15}>15 minutes</MenuItem>
                  <MenuItem value={20}>20 minutes</MenuItem>
                  <MenuItem value={30}>30 minutes</MenuItem>
                </Select>
              </FormControl>
            </form>

            <p></p>

            <Button className={classes.button} variant="contained" onClick={_ =>
              this.props.dispatch(addCalendar(this.state))
            }>Add Calendar</Button>
          </div>
        </header>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    calendars: state.calendars
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Home));