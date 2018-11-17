import actionType from '../constants';
import { push } from 'connected-react-router';
import constants from '../constants';
import {
  postCalendar,
  getAllCalendars,
  getCalendarById,
  postMeeting
} from '../api/FermionApi'

export const loadAllCalendars = () => {
  return {
    type: actionType.LOAD_ALL_CALENDARS,
    payload: getAllCalendars()
  }
}

export const loadCalendar = id => {
  return {
    type: actionType.LOAD_CALENDAR_BY_ID,
    payload: getCalendarById(id)
  }
}

export const addCalendar = ({ calendarName, startHour, endHour, startDate, endDate, duration }) => {
  return dispatch => {
    return postCalendar({ calendarName, startHour, endHour, startDate, endDate, duration })
      .then(cal => {
        dispatch({
          type: constants.ADD_CALENDAR,
          payload: cal
        })
        return cal
      })
      .then(cal => dispatch(push(`/calendar/${cal.id}`)))
      .catch(console.error)
  }
}

export const scheduleMeeting = ({ calendarId, date, startTime, location, guest }) => {
  return {
    type: constants.SCHEDULE_MEETING,
    payload: postMeeting({ calendarId, date, startTime, location, guest })
  }
}

// {calendars: [
//   {
//     id: "calId1",
//     name: "Cal One",
//     days: [
//       '03-11-2018',
//       '04-11-2018',
//       '05-11-2018',
//       '06-11-2018'
//     ]
//   }
// ],
// timeSlots: [
//   {
//     id: 'timeslotId1',
//     day: '03-11-2018',
//     startTime: "12:00",
//     endTime: "12:20",
//     meeting: 'meetignId1'
//   },
//   {
//     id: 'timeslotId2',
//     day: '04-11-2018',
//     startTime: "12:00",
//     endTime: "12:20",
//   },
//   {
//     id: 'timeslotId3',
//     day: '05-11-2018',
//     startTime: "12:00",
//     endTime: "12:20",
//   },
//   {
//     id: 'timeslotId4',
//     day: '06-11-2018',
//     startTime: "12:00",
//     endTime: "12:20",
//   }
// ],
// meetings: [
//   {
//     calendarId: "calId1"
//     location: "My Office",
//     with: "Joe"
//   }
// ]
// }