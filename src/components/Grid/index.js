import moment from "moment";
import React from "react";
import "./style.css";

const Grid = ({ startDay, dayToday, openFormEvent, events }) => {
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(35)].map(() => day.add(1, "day").clone());

  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isDisableMonth = (month) => dayToday.isSame(month, "month");

  return (
    <div className="grid">
      <div className="container_grid">
        {[...Array(7)].map((_, i) => (
          <div className="week_cells" key={i}>
            <span className="week_day">
              {moment()
                .day(i + 1)
                .format("ddd")}
            </span>
          </div>
        ))}
        {}{daysArray.map((element) => (
          <div className="container_grid_element" key={element}>
            <div
              className={
                element.day() === 6 || element.day() === 0
                  ? "background_brown"
                  : "background_milky"
              }
            >
              <div
                className={`${
                  !isCurrentDay(element) ? element.format("D") : "current_day"
                } ${!isDisableMonth(element) ? "month_disable" : ""}`}
              >
                <div className="cell_header">
                  <span className="date"> {element.format("D")}</span>
                  <button onClick={() => {openFormEvent("Create", element) }}> + </button>
                </div>
                {events
                  .filter(
                    (e) => {
                      return e.date >= element.valueOf() &&
                      e.date <= element.clone().endOf("day").valueOf()
                    }
                  )
                  .map((e) => (
                    <div
                      className="form"
                      onDoubleClick={() => openFormEvent("Update", moment(Number(e.date)), e)}
                    >
                      <li>{e.title}</li>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
