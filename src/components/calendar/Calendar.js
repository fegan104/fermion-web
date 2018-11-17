import React from 'react';
import { connect } from 'react-redux'
import { loadCalendar, scheduleMeeting } from '../../actions/CalendarActions'
import ScheduleMeetingDialog from './ScheduleMeetingDialog.js'
import CalendarView from './CalendarView'
import * as dateFns from "date-fns";
import DayView from './DayView'
import './Calendar.css'


class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      meetingDialogOpen: false,
      selectedTimeslot: { statTime: "", endTime: "" }
    }
  }

  componentDidMount() {
    this.props.loadCalendar()
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
    const { timeSlots, meetings, scheduleMeeting, match } = this.props
    const { selectedDate, currentMonth } = this.state
    //Timeslots for the currently selected day
    const dailyTimeslots = timeSlots
      .filter(t => t.day === dateFns.format(selectedDate, "dd-MM-yyyy"))
      .sort((a, b) => {
        const aTime = dateFns.toDate(`2018-10-11T${a.startTime}:00`)
        const bTime = dateFns.toDate(`2018-10-11T${b.startTime}:00`)
        console.log(aTime)
        return dateFns.compareAsc(aTime, bTime)
      })
      
    return (
      <div>
        <DayView
          calendarId={match.params.id}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
          timeSlots={dailyTimeslots}
          onSelect={t => {
            this.setState({ meetingDialogOpen: true })
            this.setState({ selectedTimeslot: t })
          }} />

        <CalendarView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={this.onDateClick} />

        <ScheduleMeetingDialog
          open={this.state.meetingDialogOpen}
          timeSlot={this.state.selectedTimeslot}
          date={dateFns.format(selectedDate, "yyyy-MM-dd")}
          onConfirm={data => {
            this.setState({ meetingDialogOpen: false })
            if (data) scheduleMeeting(data)
          }} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { timeSlots, meetings } = state

  return {
    timeSlots,
    meetings
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    loadCalendar: () => {
      console.log(ownProps.match.params.id)
      dispatch(loadCalendar(ownProps.match.params.id))
    },
    scheduleMeeting: ({ calendarId, date, startTime, location, guest }) => {
      dispatch(scheduleMeeting({ calendarId, date, startTime, location, guest }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);