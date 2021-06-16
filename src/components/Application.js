import React, { useEffect } from "react";
import { DayList } from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";
import "components/Application.scss";
import getInterview from "helpers/getInterview";
import getInterviewersForDay from "helpers/getInterviewersForDay";
import useApplicationData from "hooks/useApplicationData";

const axios = require("axios");

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview, setState } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
  }, []); //This empty dependency array prevents the useEffect from being called multiple times. It throws a non-detrimental error into the browser console, but I could not find a way to prevent useEffect from loading again without upsetting the program.

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(
            state.interviewers,
            appointment.interview
          );
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}
      </section>
    </main>
  );
}
