import React from 'react';
import { connect } from 'react-redux'
import { loadCalendar } from '../../actions/CalendarActions'

class Calendar extends React.Component {

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(loadCalendar(match.params.id))
  }

  render() {
    const { calendar, timeSlots, meetings } = this.props
    try {
      const dayTotimeSlots = calendar.days.map(d => {
        return {
          day: d,
          timeSlots: timeSlots.filter(t => t.day === d)
        }
      })
      console.log(dayTotimeSlots)
      const listItems = dayTotimeSlots.map(d => {
        return (
          <div key={d.day}>
            Day: {d.day}
            <ul>
              {d.timeSlots.map(t => <li key={t.id}>{`${t.startTime}-${t.endTime}`}</li>)}
            </ul>
          </div>
        )
      })
      return (
        <ul>
          {listItems}
        </ul>
      )
    } catch (e) {
      return <div>{e.message}</div>
    }
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