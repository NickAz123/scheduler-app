import React from "react";
import Button from "../Button"

export default function Confirm(props) {

  const clickDelete = () => {
    props.delete(props.interviewID);
  }

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={clickDelete}>Confirm</Button>
      </section>
    </main>
  )
}