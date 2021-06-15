export default function getInterviewsForDay(state, day) {
  let resultsAr = [];
  const daysArray = state.days;
  const appointsAr = state.interviewers;

  const findApps = function () {
    for (let days in daysArray) {
      if (daysArray[days].name === day) {
        return (daysArray[days].interviewers);
      }
    }
    return [];
  }

  let idAr = findApps();

  if (idAr.length === 0){
    return [];
  } else {
    for (let appointment in appointsAr) {
      if (idAr.includes(appointsAr[appointment].id)){
        resultsAr.push(appointsAr[appointment]);
      }
    }
    return resultsAr;
  }
}