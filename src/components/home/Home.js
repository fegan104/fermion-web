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
      startHour: 12,
      endHour: 13,
      startDate: '03-11-2018',
      endDate: '06-11-2018',
      duration: 20
    }
  }

  componentDidMount() {
    this.props.dispatch(loadAllCalendars())
  }

  render() {
    const cals = this.props.calendars
      ? this.props.calendars.map(c =>
        <li key={c.id}><Link to={`calendar/${c.id}`}>{c.name}</Link></li>
      )
      : (<div>No calendars</div>)

    return (
      <div className="App">
        <header className="App-header">
          Calendars:
          <ul>
            {cals}
          </ul>
          <p></p>
          <div>
            <TextField
              value={this.state.startHour}
              placeholder="start time hh:mm"
              onChange={e => this.setState({ startHour: e.target.value })} />
            <p></p>
            <TextField
              value={this.state.endHour}
              placeholder="end time hh:mm"
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