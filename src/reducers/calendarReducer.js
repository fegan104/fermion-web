import actionType from '../constants'

//TODO make time a real object form moment js or something
export default (state = [], action) => {
  switch (action.type) {
    case actionType.LOAD_ALL_CALENDARS_FULFILLED: {
      return action.payload
    }
    case actionType.LOAD_CALENDAR_FULFILLED: {
      return action.payload
    }
    default:
      return state
  }
}