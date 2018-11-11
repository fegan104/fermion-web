import React from 'react';
import { connect } from 'react-redux'
import { loadCalendar } from '../../actions/CalendarActions'
import CalendarView from './CalendarView'
import * as dateFns from "date-fns";
import DayView from './DayView'
import './Calendar.css'


class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    }
  }


  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(loadCalendar(match.params.id))
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  render() {
    const { calendar, timeSlots, meetings } = this.props
    const { selectedDate, currentMonth } = this.state
    return (
      <div>
        <DayView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth} />

        <CalendarView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={this.onDateClick} />
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