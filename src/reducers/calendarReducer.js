import actionType from '../constants'

const initState = { calendars: [], timeSlots: [], meetings: [] }

export default (state = initState, action) => {
  switch (action.type) {
    case actionType.LOAD_ALL_CALENDARS_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        calendars: payload.map(c => {
          return {
            id: c.id,
            days: c.days.map(d => d.day),
            name: c.name
          }
        })
      }
    }
    case actionType.LOAD_CALENDAR_BY_ID_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        timeSlots: [...state.timeSlots, ...payload.days.flatMap(d => d.timeslots)],
        meetings: [...state.meetings, ...payload.days.flatMap(d => d.meetings)],
        calendars: [...state.calendars.filter(c => c.id !== payload.id), {
          id: payload.id,
          days: payload.days.map(d => d.day),
          name: payload.name
        }]
      }
    }
    case actionType.LOAD_CALENDAR_FULFILLED: {
      return state
    }
    case actionType.ADD_CALENDAR: {
      const { payload } = action
      return {
        ...state,
        timeSlots: [...state.timeSlots, ...payload.days.flatMap(d => d.timeslots)],
        meetings: [...state.meetings, ...payload.days.flatMap(d => d.meetings)],
        calendars: [...state.calendars, {
          id: payload.id,
          days: payload.days.map(d => d.day),
          name: payload.name
        }]
      }
    }
    case actionType.SCHEDULE_MEETING_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        meetings: [...state.meetings, payload]
      }
    }
    case actionType.CANCEL_MEETING_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        meetings: state.meetings.filter(m =>
          (m.startTime !== payload.startTime) || (m.day !== payload.date)
        )
      }
    }
    default:
      return state
  }
}
