import actionType from '../constants';


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