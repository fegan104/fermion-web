import React from 'react'
import * as dateFns from "date-fns";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

var DayView = ({
  calendarId,
  selectedDate,
  prevMonth,
  currentMonth,
  nextMonth,
  timeSlots,
  meetings,
  onSelect
}) => {

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="day-view-header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
        </div>
        </div>
        <div className="col col-center" style={{ fontSize: 32 }}>
          <span>
            {dateFns.format(currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  const mergeTimeSlotMeetings = () => {
    return timeSlots.map(t => {
      return {
        ...t,
        ...meetings.find(m => m.startTime === t.startTime)
      }
    })
  }

  return (
    <div style={{ float: "right", width: "25vw", background: "#1A237E", padding: "8px", height: "100vh", textAlign: "center", overflow: "scroll" }}>
      <div>{renderHeader()}</div>
      <div>{`Schedule for ${dateFns.format(selectedDate, "MMM d")}`}</div>
      <List>
        {mergeTimeSlotMeetings().map(t => (
          <ListItem key={t.id} onClick={() => onSelect(t)}>{t.guest ?
            `${t.startTime} meeting w/${t.guest} @${t.location} ${t.endTime}`
            : `${t.startTime} -- ${t.endTime}`}
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default DayView;