import constants from '../constants'

export const getAllCalendars = async () => {
  const res = await fetch(`${constants.API_BASE}/calendar`)
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
export const postCalendar = async ({ startHour, endHour, startDate, endDate, duration }) => {
  try {
    const res = await fetch(`${constants.API_BASE}/calendar`, {
      method: "POST",
      body: JSON.stringify({
        startHour: Number.parseInt(startHour),
        endDate,
        startDate,
        endHour: Number.parseInt(endHour),
        duration: Number.parseInt(duration)
      })
    })

    return res.json().then(j => {
      console.log(j)
      return j
    })
  } catch (error) {
    console.error(error)
    return {}
  }
}