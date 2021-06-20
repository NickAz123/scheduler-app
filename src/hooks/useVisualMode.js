import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //A function that updates the transition history when back is pressed or tested
  function updateHistory() {
    const newAr = [...history]
    const newHistory = newAr.slice(0, history.length - 1 )
    setHistory(newHistory)

    return newHistory;
  }

  //Set the state responsible to different appointment views. Manipulates the history state to keep track of users place.
  function transition(newMode, replace = false) {
    if (replace) {
     updateHistory()
    }

    setHistory([...history, newMode]);
    setMode(newMode);
  }

  //Function called by cancel and exit buttons to go back one component view.
  function back() {
    if (history.length === 1) {
      return;
    }

    const newHistory = updateHistory()
    const newMode = newHistory[newHistory.length - 1]
    setMode(newMode);
  }

  return { mode, transition, back };
}
