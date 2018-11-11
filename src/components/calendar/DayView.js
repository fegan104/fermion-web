import React from 'react'
import * as dateFns from "date-fns";

var DayView = props => {

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="day-view-header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={props.prevMonth}>
            chevron_left
        </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(props.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={props.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ float: "right", width: "25vw", background: "#1A237E", padding: "8px", height: "100vh"}}>
      <div>{renderHeader()}</div>
      <div style={{ textAlign:"center" }}>{`Schedule for ${dateFns.format(props.selectedDate, "MMM d", {addSuffix: true})}`}</div>
    </div>
  )
}

export default DayView;