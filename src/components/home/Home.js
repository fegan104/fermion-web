import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadAllCalendars, addCalendar } from '../../actions/CalendarActions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

  renderCalendarLinks(){
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
    return (
      <div className="App">
        <header className="App-header">
          {this.renderCalendarLinks()}
          <p></p>
          <div>
            <TextField
              value={this.state.startHour}
              placeholder="start hour (0-23)"
              onChange={e => this.setState({ startHour: e.target.value })} />
            <p></p>
            <TextField
              value={this.state.endHour}
              placeholder="end hour (1-23)"
              onChange={e => this.setState({ endHour: e.target.value })} />
            <p></p>
            <TextField
              value={this.state.startDate}
              placeholder="start date dd-MM-yyyy"
              onChange={e => this.setState({ startDate: e.target.value })} />
            <p></p>
            <TextField
              value={this.state.endDate}
              placeholder="endDate dd-MM-yyyy"
              onChange={e => this.setState({ endDate: e.target.value })} />
            <p></p>
            <TextField
              value={this.state.duration}
              placeholder="duration in minutes"
              onChange={e => this.setState({ duration: e.target.value })} />
            <p></p>

            <Button onClick={_ => this.props.dispatch(addCalendar(this.state))}>Add Calendar</Button>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    calendars: state.calendars
  }
}

export default connect(mapStateToProps)(Home);