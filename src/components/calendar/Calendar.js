import React from 'react';
import { connect } from 'react-redux'
import { loadCalendar, scheduleMeeting } from '../../actions/CalendarActions'
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
    console.log(day)
    this.setState({
      selectedDate: day
    });
  };

  

  render() {
    const { calendar, timeSlots, meetings, scheduleMeeting } = this.props
    const { selectedDate, currentMonth } = this.state
    return (
      <div>
        <DayView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
          timeSlots={timeSlots.filter(t => t.day === dateFns.format(selectedDate, "dd-MM-yyyy"))} />

        <CalendarView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={this.onDateClick}
          onSchedule={scheduleMeeting}/>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    dispatch,
    scheduleMeeting
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);