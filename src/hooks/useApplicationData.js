import { useState } from "react";
const axios = require('axios');

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function cancelInterview(id) {

    state.appointments[id].interview = null;

    const newObj = [state.days];

    for (let obj in newObj[0]){
      if (newObj[0][obj].name === state.day){
        newObj[0][obj].spots += 1;
      }
    }

    return axios.default.delete(`/api/appointments/${id}`).then(() => {
      setState(prev => ({
        ...prev,
        days: newObj[0] 
      }))
    })

  }

  function bookInterview(id, interview, status = false) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.default.put(`/api/appointments/${id}`, appointment).then(() => {

      setState({
        ...state,
        appointments
      });

    }).then(() => {
      const newObj = [state.days];

      for (let obj in newObj[0]){
        if (newObj[0][obj].name === state.day && status === false){
          newObj[0][obj].spots -= 1;
        }
      }

      setState(prev => ({
        ...prev,
        days: newObj[0] 
      }))
    })

  }

  const setDay = (day) => {
    setState(prev => ({ ...prev, day }));
  }

  return {state, setState, setDay, bookInterview, cancelInterview }
}