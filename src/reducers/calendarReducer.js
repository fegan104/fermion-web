import actionType from '../constants'

const initState = {calendars:[], timeSlots:[]}
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
        calendars: [...state.calendars, {
          id: payload.id,
          days: payload.days.map(d => d.day),
          name: "API Doesn't support nammes yet"
        }],
      }
    }
    default:
      return state
  }
}
