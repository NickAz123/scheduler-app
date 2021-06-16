import React from "react";
import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const NODELETE = "NODELETE";
  const NOSAVE = "NOSAVE";

  function save(name, interviewer, status) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    //calls the bookinterview function, and transitions based on the returned fulfillment/error
    Promise.all([props.bookInterview(props.id, interview, status)])
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(NOSAVE);
      });
  }

  function deleteInterview(interviewID) {
    transition(DELETING);
    //calls the bookinterview function, and transitions based on the returned fulfillment/error
    Promise.all([props.cancelInterview(interviewID)])
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(NODELETE);
      });
  }

  const { interview, interviewers } = props;

  //Imported hook for changing displayed interview items based on state
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          delete={() => transition(CONFIRM)}
          edit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
          interview={interview}
          name={interview.student}
          interviewer={interview.interviewer.id}
          status={true}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          delete={deleteInterview}
          interviewID={props.id}
        />
      )}
      {mode === SAVING && <Status status="Saving" />}
      {mode === DELETING && <Status status="Deleting" />}
      {mode === NODELETE && (
        <Error message="Cannot Delete" onClose={() => back()} />
      )}
      {mode === NOSAVE && (
        <Error message="Cannot Save" onClose={() => back()} />
      )}
    </article>
  );
}
