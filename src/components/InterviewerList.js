import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const { interviewers } = props;

  const interviewerHTML = interviewers.map((interviewer) => {

    const check = (interviewerID) => {
      if (interviewerID === interviewer.id) {
        return interviewer;
      } else {
        return false;
      }
    }

    return (
      <InterviewerListItem
        key={interviewer.id}
        selected={check(props.interviewer)}
        avatar={interviewer.avatar}
        name={interviewer.name}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerHTML}</ul>
    </section>
  )
}

// InterviewerList.propTypes = {
//   interviewers: PropTypes.array.isRequired
// };

// export default InterviewerList;