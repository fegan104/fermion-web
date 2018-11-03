import actionType from '../constants';
import { postCalendar } from '../api/FermionApi'
import { push } from 'connected-react-router';
import constants from '../constants';

export const loadAllCalendars = () => {
  return {
    type: actionType.LOAD_CALENDAR,
    payload: load()
  }
}

export const loadCalendar = id => {
  return {
    type: actionType.LOAD_CALENDAR,
    payload: load()
  }
}

export const addCalendar = ({ startHour, endHour, startDate, endDate, duration }) => {
  return dispatch => {
    return postCalendar({ startHour, endHour, startDate, endDate, duration })
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

const load = () => {
  return Promise.resolve({
    calendars: [
      {
        id: "calId1",
        name: "Cal One",
        days: [
          '03-11-2018',
          '04-11-2018',
          '05-11-2018',
          '06-11-2018'
        ]
      }
    ],
    timeSlots: [
      {
        id: 'timeslotId1',
        day: '03-11-2018',
        startTime: "12:00",
        endTime: "12:20",
        meeting: 'meetignId1'
      },
      {
        id: 'timeslotId2',
        day: '04-11-2018',
        startTime: "12:00",
        endTime: "12:20",
      },
      {
        id: 'timeslotId3',
        day: '05-11-2018',
        startTime: "12:00",
        endTime: "12:20",
      },
      {
        id: 'timeslotId4',
        day: '06-11-2018',
        startTime: "12:00",
        endTime: "12:20",
      }
    ],
    meetings: [
      {
        id: 'meetignId1',
        location: "My Office",
        with: "Joe"
      }
    ]
  })
}