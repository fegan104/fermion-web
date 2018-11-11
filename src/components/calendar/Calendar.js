import React from 'react';
import { connect } from 'react-redux'
import { loadCalendar } from '../../actions/CalendarActions'
import CalendarView from './CalendarView'
import './Calendar.css'


class Calendar extends React.Component {

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(loadCalendar(match.params.id))
  }

  render() {
    const { calendar, timeSlots, meetings } = this.props
    return (
      <div>
        <main>
          <CalendarView />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { calendars, timeSlots, meetings } = state
  const cal = calendars ? calendars.filter(c => c.id === ownProps.match.params.id) : [{}]

  return {
    calendar: cal[0],
    timeSlots,
    meetings
  }
}

export default connect(mapStateToProps)(Calendar);