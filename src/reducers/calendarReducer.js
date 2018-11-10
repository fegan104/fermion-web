import actionType from '../constants'

const initState = {calendars:[], timeSlots:[], meetings:[]}
//TODO make time a real object form moment js or something
export default (state = initState, action) => {
  switch (action.type) {
    case actionType.LOAD_ALL_CALENDARS_FULFILLED: {
      return state
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
        }],
      }
    }
    default:
      return state
  }
}
