import React, { useEffect, useState } from "react";
import Picker from "../Picker";
import Grid from "../Grid";
import moment from "moment";
import "./style.css";

const Application = () => {
  moment.updateLocale("en", { week: { dow: 1 } });
  moment.updateLocale('en', {week: {dow: 1}});
  const url = "http://localhost:4000";
  const [method, setMethod] = useState(null);
  const [dayToday, setDayToday] = useState(moment());
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({});
  const [isShowForm, setIsShowForm] = useState(true);
  const [element, setElement] = useState(null);
  const startDay = dayToday.clone().startOf("month").startOf("week");

  const prevButton = () =>
    setDayToday((prev) => prev.clone().subtract(1, "month"));
  const todayButton = () => setDayToday(moment());
  const nextButton = () => setDayToday((next) => next.clone().add(1, "month"));

  const openFormEvent = (methodName, element, eventData = {}) => {
    setEventData(eventData);
    setElement(element.valueOf());
    setIsShowForm(false);
    setMethod(methodName);
  };

  const cancelButton = () => {
    setIsShowForm(true);
    setEventData({});
  };

  const changeEventHandler = (text, field) => {
    setEventData((prevState) => {
      return {
        ...prevState,
        [field]: text,
      };
    });
  };

  const getEvents = () => {
    fetch(`${url}/events`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });
  }

  const editNewEvent = () => {
    const fetchUrl = `${url}/events/${eventData.id}` ;
    fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...eventData, date: element}),
    })
      .then((res) => res.json())
      .then(() => {
          getEvents();
          cancelButton();
      });
  };

  const createNewEvent = () => {
    const fetchUrl = `${url}/events/`;
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...eventData, date: element}),
    })
      .then((res) => res.json())
      .then(() => {
        getEvents();
        cancelButton();
      });
  };

  const deleteEvent = () => {
    const fetchUrl = `${url}/events/${eventData.id}`;
    const httpMethod = "DELETE";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getEvents();
        cancelButton();
      });
  };

  useEffect(() => {;
    getEvents();
  }, []);

  return (
    <>
      {!isShowForm ? (
        <div className="events_form" onClick={(e) => e.stopPropagation()}>
          <div className="form_header">
            <span className="title">{method === 'Update' ? 'Edit Event' : method === 'Create' ? 'Add new Event' :'' } </span>
            <button className="cancel_button" onClick={cancelButton}>
              X
            </button>
          </div>
          <div className="form_title">
            <input
              type="text"
              value={eventData.title || ''}
              onChange={(eventData) =>
                changeEventHandler(eventData.target.value, "title")
              }
              placeholder="Title..."
            />
          </div>
          <div className="form_body">
            <textarea
              value={eventData.description || ''}
              onChange={(eventData) =>
                changeEventHandler(eventData.target.value, "description")
              }
              placeholder="Description..."
            />
          </div>
          <div className="date_add">{moment(element).format('DD-MM-YYYY')}</div>
          <div className="form_buttons">
            <button className="add_button" onClick={method === 'Update' ? editNewEvent : method === 'Create' ? createNewEvent : ''}>
              {method}
            </button>
            <button className="delete_button" onClick={deleteEvent}>
              Delete Event
            </button>
          </div>
        </div>
      ) : null}
      <div className="wrapper">
        <Picker
          dayToday={dayToday}
          prevButton={prevButton}
          todayButton={todayButton}
          nextButton={nextButton}
        />
        <Grid
          startDay={startDay}
          dayToday={dayToday}
          events={events}
          openFormEvent={openFormEvent}
        />
      </div>
    </>
  );
};

export default Application;
