import constants from '../constants'

export const getAllCalendars = async () => {
  const res = await fetch(`${constants.API_BASE}/calendar`)
  return res.json()
}

export const getCalendarById = async (calendarId) => {
  const res = await fetch(`${constants.API_BASE}/calendar/${calendarId}`)
  return res.json()
}

/**
 * Adds a new calendar to the database, then returns the newly created data.
 * @param {Int} startHour 
 * @param {Int} endHour 
 * @param {String} startDate 
 * @param {String} endDate 
 * @param {Int} duration 
 */
export const postCalendar = async ({ calendarName, startHour, endHour, startDate, endDate, duration }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/calendar`, {
      method: "POST",
      body: JSON.stringify({
        name: calendarName,
        endDate: endDate.split("-").reverse().join("-"),
        startDate: startDate.split("-").reverse().join("-"),
        startHour: Number.parseInt(startHour),
        endHour: Number.parseInt(endHour),
        duration: Number.parseInt(duration)
      })
    })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const deleteCalendarById = async (calendarId) => {
  try {
    const res = await fetch(`${constants.API_BASE}/calendar/${calendarId}`, {
      method: "DELETE"
    })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const getDay = async ({ date, calendarId }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/day?date=${date}&calendarId=${calendarId}`)

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const postDay = async ({ date, calendarId }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/day?date=${date.split("-").reverse().join("-")}&calendarId=${calendarId}`, {
      method: "POST",
      body: JSON.stringify({
        date,
        calendarId
      })
    })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const deleteDay = async ({ date, calendarId }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/day?date=${date.split("-").reverse().join("-")}&calendarId=${calendarId}`, {
      method: "DELETE"
    })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const deleteTimeslot = async ({ calendarId, date, time, dayOfWeek, id }) => {
  let dateParam = ""
  let timeParam = ""
  let dayOfWeekParam = ""
  let idParam = ""

  if (date) dateParam = '&date=' + date.split("-").reverse().join("-")
  if (time) timeParam = `&time=${time}`
  if (dayOfWeek) dayOfWeekParam = `&dayOfWeek=${dayOfWeek}`
  if (id) idParam = `&id=${id}`

  try {
    const res = await fetch(
      constants.API_BASE + `/timeslot?calendarId=${calendarId}` + dateParam + timeParam + dayOfWeekParam + idParam, {
        method: "DELETE"
      })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const getTimeslot = async ({ timeslotId }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/timeslot/${timeslotId}`)

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const postMeeting = async ({ calendarId, date, startTime, endTime, location, guest }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/meeting`, {
      method: "POST",
      body: JSON.stringify({
        calendar: calendarId,
        day: date.split("-").reverse().join("-"),
        startTime,
        endTime,
        location,
        guest
      })
    })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}

export const deleteMeeting = async ({ calendarId, date, startTime }) => {
  try {
    const res = await fetch(
      `${constants.API_BASE}/meeting?calendarId=${calendarId}&date=${date.split("-").reverse().join("-")}&startTime=${startTime}`, {
        method: "DELETE"
      })

    return res.json()
  } catch (error) {
    console.error(error)
    return {}
  }
}