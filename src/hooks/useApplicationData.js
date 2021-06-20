import { useState, useEffect } from "react";
const axios = require("axios");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Initial Axios Call to set state by fetching API data
  useEffect(() => {
    Promise.all([
      axios.default.get("/api/days"),
      axios.default.get("/api/appointments"),
      axios.default.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Removes appointment on confirmationfrom the database via axios and changes the spots key in the days object
  function cancelInterview(id) {
    state.appointments[id].interview = null;

    const newObj = [state.days];

    //loop for live spots updating
    for (let obj in newObj[0]) {
      if (newObj[0][obj].name === state.day) {
        newObj[0][obj].spots += 1;
      }
    }

    return axios.default.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({
        ...prev,
        days: newObj[0],
      }));
    });
  }

  //On confirmation, updates the applications state and sends the new appointment to the database
  function bookInterview(id, interview, status = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.default
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        const newObj = [state.days];

        //loop for live spots updating
        for (let obj in newObj[0]) {
          if (newObj[0][obj].name === state.day && status === false) {
            newObj[0][obj].spots -= 1;
          }
        }

        setState((prev) => ({
          ...prev,
          days: newObj[0],
        }));
      });
  }

  const setDay = (day) => {
    setState((prev) => ({ ...prev, day }));
  };

  return { state, setState, setDay, bookInterview, cancelInterview };
}
