import React from "react";
import * as dateFns from "date-fns";

class CalendarView extends React.Component {

  renderDays() {
    const dateFormat = "EEE";
    const days = [];
    let startDate = dateFns.startOfWeek(this.props.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.props;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart) ? "disabled" : ""}`}
            key={day}
            onClick={() => this.props.onDateClick(dateFns.toDate(cloneDay))}>
            <span className={`number ${dateFns.isSameDay(day, selectedDate) ? "selected" : selectedDate}`}>{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <div className="calendar">
        <div style={{
          float: "right",
          background: "#5C6BC0",
          color: "white",
          padding:"24px",
          marginTop:"16px",
          marginBottom:"16px",
          marginRight:"64px",
          borderRadius: "48px"
        }}>ADD CALENDAR FILTER</div>
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default CalendarView;