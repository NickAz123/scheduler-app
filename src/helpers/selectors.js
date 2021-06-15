export default function getAppointmentsForDay(state, day) {
  let resultsAr = [];
  const daysArray = state.days;
  const appointsAr = state.appointments;

  const findApps = function () {
    for (let days in daysArray) {
      if (daysArray[days].name === day) {
        return (daysArray[days].appointments);
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