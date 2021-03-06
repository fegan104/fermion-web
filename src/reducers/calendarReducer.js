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
    case actionType.DELETE_CALENDAR_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        calendars: state.calendars.filter(c =>
          (c.id !== payload.id)
        )
      }
    }
    case actionType.DELETE_TIMESLOT_FULFILLED: {
      const { payload } = action
      const removedIds = payload.map(t => t.id)
      return {
        ...state,
        timeSlots: state
          .timeSlots
          .filter(t => (removedIds.indexOf(t.id) === -1))//keep if not in removed
      }
    }
    case actionType.ADD_DAY_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        timeSlots: [...state.timeSlots, ...payload.timeslots]
      }
    }
    case actionType.DELETE_DAY_FULFILLED: {
      const { payload } = action
      return {
        ...state,
        timeSlots: state.timeSlots.filter(t => t.day !== payload.day)
      }
    }
    default:
      return state
  }
}
