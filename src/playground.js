function addTime(pairs) {
  if (!Array.isArray(pairs)) {
    return;
  }
  let hourTotal = 0,
    minuteTotal = 0;
  for (const pair of pairs) {
    if (Array.isArray(pair) && pair.length === 2) {
      minuteTotal += pair[1];
      hourTotal += Math.floor(minuteTotal / 60);
      minuteTotal = minuteTotal % 60;
      hourTotal += pair[0];
    }
  }
  return { hours: hourTotal, minutes: minuteTotal };
}

const courseTimeLeft = addTime([
  [1, 24], //18
  [2, 9], //19
  [2, 5], //20
  [1, 48], //21
  [1, 14], //22
  [0, 33], //23
  [1, 4], //24
  [3, 17], //25
  [2, 24], //26
  [1, 14], //27
  [1, 6], //28
  [2, 45], //29
  [1, 35], //30
  [1, 38], //31
  [2, 9], //32
  [2, 31], //33
  [1, 51], //34
  [1, 35], //35
  [1, 37], //36
  [0, 2], //37
]);
console.log(courseTimeLeft);
