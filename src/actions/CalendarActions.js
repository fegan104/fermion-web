import actionType from '../constants';
import { push } from 'connected-react-router';
import constants from '../constants';
import {
  postCalendar,
  getAllCalendars,
  getCalendarById,
  postMeeting,
  deleteMeeting,
  deleteCalendarById,
  deleteTimeslot
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

export const scheduleMeeting = (meeting) => {
  return {
    type: constants.SCHEDULE_MEETING,
    payload: postMeeting(meeting)
  }
}

export const cancelMeeting = (meeting) => {
  return {
    type: constants.CANCEL_MEETING,
    payload: deleteMeeting(meeting)
  }
}

export const removeCalendar = (id) => {
  return {
    type: constants.DELETE_CALENDAR,
    payload: deleteCalendarById(id)
  }
}

export const closeTimelsots = (params) => {
  return {
    type: constants.DELETE_CALENDAR,
    payload: deleteTimeslot(params)
  }
}
