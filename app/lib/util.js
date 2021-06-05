export const convertFahrenToCelsi = temp => {
  const tempStr = (((temp - 32) * 5) / 9).toFixed(2);
  const tempArr = tempStr.split('.');
  const prevDec = Number(tempArr[0]);
  const aftrDec = tempArr.length > 1 ? Number(tempArr[1]) : 0;
  return [prevDec, aftrDec];
};

export const convertCelsiToFahren = temp => {
  const tempStr = ((temp * 9) / 5 + 32).toFixed(2);
  const tempArr = tempStr.split('.');
  const prevDec = Number(tempArr[0]);
  const aftrDec = tempArr.length > 1 ? Number(tempArr[1]) : 0;
  return [prevDec, aftrDec];
};

export const convertKgToLbs = weight => {
  const weightStr = (weight * 2.205).toFixed(2);
  const weightArr = weightStr.split('.');
  const prevDec = Number(weightArr[0]);
  const aftrDec = weightArr.length > 1 ? Number(weightArr[1]) : 0;
  return [prevDec, aftrDec];
};

export const convertLbsToKg = weight => {
  const weightStr = (weight / 2.205).toFixed(2);
  const weightArr = weightStr.split('.');
  const prevDec = Number(weightArr[0]);
  const aftrDec = weightArr.length > 1 ? Number(weightArr[1]) : 0;
  return [prevDec, aftrDec];
};

export const convertCmToFeetInch = height => {
  const inchTotal = height / 2.54;
  const feet = Math.floor(inchTotal / 12);
  const inchRemaining = inchTotal - 12 * feet;
  const inchArr = `${inchRemaining}`.split('.');

  const aftrDec = Number(inchArr.join('').substr(0, 2));
  return [feet, aftrDec];
};

export const convertFeetInchToCm = height => {
  const heightStr = `${height}`;
  const heightArr = heightStr.split('.');

  const cmVal = heightArr[0] * 30.48 + heightArr[1] * 2.54;
  const prevDec = Number(Math.round(cmVal));
  const aftrDec = 0;
  return [prevDec, aftrDec];
};

export const findLogLastDay = (log, key, occur = 0) => {
  //This is the last date in logs
  const reverseKeys = [...log.dates].sort().reverse();

  //We are keeping record that how many times we have found the
  //given key
  let foundTimes = -1;

  //Has Items
  const checkItems = ['weight', 'blood_pressure', 'sugar', 'bb_temperature'].indexOf(key) >= 0;

  let lastDateKey = null;

  //We will go in reverse order
  reverseKeys.every(dtKey => {
    if (log.dayLog[dtKey][key]) {
      if (checkItems && Object.keys(log.dayLog[dtKey][key].items).length > 0) {
        foundTimes++;
      }
      if (foundTimes === occur) {
        //Break the loop as we found our key
        lastDateKey = dtKey;
        return false;
      }
    }
  });

  return lastDateKey
    ? {date: lastDateKey, value: log.dayLog[lastDateKey][key], dateKeys: reverseKeys}
    : lastDateKey;
};
