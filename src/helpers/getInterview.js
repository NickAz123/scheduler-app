export default function getInterview (state, interview) {
  if (interview === null) {
    return null;
  }
  let intId = interview.interviewer;
  
  let getIntObj = (intObj) => {
    for (let obj in intObj){
      if (Number(obj) === intId){
        return intObj[obj];
      }
    }
  }

  let intObj = getIntObj(state);

  return {
    student: interview.student,
    interviewer: intObj
  }
}