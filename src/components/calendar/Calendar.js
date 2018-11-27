import React from 'react';
import { connect } from 'react-redux'
import ScheduleMeetingDialog from './ScheduleMeetingDialog.js'
import CloseTimelsotDialog from './CloseTimeslotDialog.js'
import CalendarView from './CalendarView'
import * as dateFns from "date-fns";
import DayView from './DayView'
import './Calendar.css'
import {
  loadCalendar,
  scheduleMeeting,
  cancelMeeting,
  closeTimelsots
} from '../../actions/CalendarActions'


class Calendar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      meetingDialogOpen: false,
      timeSlotDialogOpen: false,
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
    const { timeSlots, meetings, scheduleMeeting, cancelMeeting, match } = this.props
    const { selectedDate, currentMonth } = this.state
    //Timeslots for the currently selected day
    const dailyTimeslots = timeSlots
      .filter(t => t.day === dateFns.format(selectedDate, "dd-MM-yyyy"))
      .sort((a, b) => {
        const aTime = dateFns.toDate(`2018-10-11T${a.startTime}:00`)
        const bTime = dateFns.toDate(`2018-10-11T${b.startTime}:00`)
        return dateFns.compareAsc(aTime, bTime)
      })

    const dailyMeetings = meetings
      .filter(m => m.day === dateFns.format(selectedDate, "dd-MM-yyyy"))
      .sort((a, b) => {
        const aTime = dateFns.toDate(`2018-10-11T${a.startTime}:00`)
        const bTime = dateFns.toDate(`2018-10-11T${b.startTime}:00`)
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
          meetings={dailyMeetings}
          onSelect={t => {
            this.setState({ meetingDialogOpen: true })
            this.setState({ selectedTimeslot: t })
          }} />

        <CalendarView
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={this.onDateClick}
          timeSlotAction={_ => {this.setState({ timeSlotDialogOpen: true }); console.log("action")}}
          todayAction={_ => {
            this.setState({
              selectedDate: new Date(),
              currentMonth: new Date()
            })
          }} />

        <ScheduleMeetingDialog
          calendarId={match.params.id}
          open={this.state.meetingDialogOpen}
          timeSlot={this.state.selectedTimeslot}
          date={dateFns.format(selectedDate, "yyyy-MM-dd")}
          onConfirm={meeting => {
            this.setState({ meetingDialogOpen: false })
            if (meeting) scheduleMeeting(meeting)
          }}
          onDelete={meeting => {
            this.setState({ meetingDialogOpen: false })
            if (meeting) cancelMeeting(meeting)
          }} />

        <CloseTimelsotDialog open={this.state.timeSlotDialogOpen} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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
      dispatch(loadCalendar(ownProps.match.params.id))
    },
    scheduleMeeting: (meeting) => {
      dispatch(scheduleMeeting(meeting))
    },
    cancelMeeting: (meeting) => {
      dispatch(cancelMeeting(meeting))
    },
    closeTimeslots: (params) => {
      dispatch(closeTimelsots(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);