export const setPersonSteps = (id, { steps, name }, persons = {}) => {
  return {
    ...persons,
    [id]: {
      steps: parseInt(steps, 10),
      name
    }
  }
}

export const calculateInformation = (persons = {}, id) => {
  if(!persons[id]) {
    return {
      steps: 0,
      toNext: 0,
      beforePrevious: 0,
      nextChallenger: '',
      previousChallenger: '',
      position: ''
    }
  } else {
    const { steps } = persons[id];
    let info = { steps };
    const sortedIds =  Object
      .keys(persons)
      .sort((id1, id2) => persons[id2].steps - persons[id1].steps);
    const position = sortedIds.indexOf(id);
    const nextPerson = persons[sortedIds[Math.max(0, position -1)]];
    const previousPerson = persons[sortedIds[Math.min(sortedIds.length - 1, position + 1)]];
    return {
      steps,
      toNext: Math.floor((steps / nextPerson.steps) * 360),
      beforePrevious: Math.floor((previousPerson.steps / steps) * 360),
      nextChallenger: nextPerson.name,
      previousChallenger: previousPerson.name,
      position: `#${position + 1}`
    }
  }
}