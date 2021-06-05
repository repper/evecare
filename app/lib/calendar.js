import moment from 'moment';

const performCalendarMarkation = (today, menstrual) => {
  const monthAfter = 12;

  const periodDays = menstrual.periodDays;
  const periods = {...menstrual.periods};
  const endDate = moment(today)
    .add(monthAfter, 'months')
    .endOf('month')
    .format('YYYY-MM-DD');
  const loggedPeriodLength = periodDays.length;
  const lastKey = periodDays[loggedPeriodLength - 1];

  //We will populate the periods array with future periods as we will do calculation on them
  let lastPeriod = periods[lastKey];

  //We will loop till the last days of our end date
  while (1) {
    const mt = moment(lastPeriod.start).add(menstrual.cycleLength, 'days');
    const start = mt.format('YYYY-MM-DD');
    const end = mt.add(menstrual.periodLength - 1, 'days').format('YYYY-MM-DD');
    if (start > endDate) {
      break;
    }
    lastPeriod = {start, end};
    periods[start] = {start, end};
  }

  let calDate = moment(periodDays[0]);
  let markedDates = {};
  //As the first markation will start from period date only
  let isPeriodDate = true;
  let dayCounter = 1;
  let isFuture = false;
  let isPeriodPrediction = false;
  let periodDateKey = periodDays[0];
  let periodProcessed = 1;
  let periodSetProcessed = false;

  //Set up first ovulation Days
  let ovuPeriodEndDate = moment(periods[periodDays[0]].start).add(menstrual.cycleLength - 1, 'days');

  //If there is more than 1 period then we have to see the start
  //of next period and do calculation as per that
  if (periodDays.length > 1) {
    ovuPeriodEndDate = moment(periodDays[1]).subtract(1, 'days');
  }
  let ovulationDays = getOvulationDays(ovuPeriodEndDate, menstrual);

  //We will add markings for days before first date
  //because we do not want to show add period till period length days
  for (let indexer = 0; indexer < menstrual.periodLength; indexer++) {
    if (indexer === 0) {
      continue;
    }
    const calM = moment(periodDateKey)
      .subtract(indexer, 'days')
      .format('YYYY-MM-DD');
    markedDates[calM] = {
      showAddPeriodBtn: false,
    };
  }

  //for showing add period button
  let showAddPeriodBtn = false;
  //for showing end period button after last period
  let showEditPeriodBtn = false;
  let handledPeriodEdit = false;
  while (1) {
    let ovulationPercent = 0;
    const formattedDate = calDate.format('YYYY-MM-DD');
    //Check if we don't have period date and if we find a period date
    if (!isPeriodDate && periods[formattedDate]) {
      periodDateKey = formattedDate;
      isPeriodDate = true;
      if (periodSetProcessed) {
        isPeriodPrediction = true;
        ovuPeriodEndDate = moment(formattedDate).add(menstrual.cycleLength - 1, 'days');
      } else {
        if (periodProcessed + 1 < loggedPeriodLength) {
          ovuPeriodEndDate = moment(periodDays[periodProcessed + 1]).subtract(1, 'days');
        } else {
          ovuPeriodEndDate = moment(formattedDate).add(menstrual.cycleLength - 1, 'days');
        }
      }
      ovulationDays = getOvulationDays(ovuPeriodEndDate, menstrual);
      dayCounter = 1;
      periodProcessed++;
    }

    //Check if we have period date and if we find that it has ended
    if (isPeriodDate && periods[periodDateKey] && formattedDate > periods[periodDateKey].end) {
      isPeriodDate = false;
      if (periodProcessed === loggedPeriodLength) {
        periodSetProcessed = true;
        showAddPeriodBtn = true;
      }
    }

    if (!isFuture && formattedDate > today) {
      isFuture = true;
      showAddPeriodBtn = false;
    }

    //We are going to check if we current date is between T+12 days
    //we will show end period button
    if (!isFuture && periodSetProcessed && !handledPeriodEdit) {
      showEditPeriodBtn = moment(formattedDate).isBefore(
        moment(periodDateKey)
          .add(13, 'days')
          .format('YYYY-MM-DD'),
      );
      if (!showEditPeriodBtn) {
        handledPeriodEdit = true;
      }
    }

    //Check if we have today date in ovulation days
    if (Object.keys(ovulationDays).indexOf(formattedDate) >= 0) {
      ovulationPercent = ovulationDays[formattedDate];
    }

    markedDates[formattedDate] = {
      showAddPeriodBtn,
      showEditPeriodBtn,
      periodDateKey,
      isPeriodDate,
      isPeriodPrediction,
      ovulationPercent,
      isFuture,
      dayCounter,
    };

    dayCounter++;
    calDate = calDate.add(1, 'day');
    if (calDate.format('YYYY-MM-DD') > endDate) {
      break;
    }
  }
  // console.log('%%%%', markedDates);
  return markedDates;
};

const getOvulationDays = (ovuPeriodEndDate, menstrual) => {
  let ovulationDays = {};

  let ovulationLength = menstrual.ovulationLength > 0 ? menstrual.ovulationLength : 14;

  ovulationLength = ovulationLength + 4;
  let ovulationStart = ovuPeriodEndDate.subtract(ovulationLength, 'days');

  for (let indexer = 1; indexer <= 6; indexer++) {
    const days = indexer === 1 ? 0 : 1;
    ovulationDays[ovulationStart.add(days, 'days').format('YYYY-MM-DD')] = 100 - (6 - indexer) * 15;
  }
  //We will add one more as for one day after;
  let indexer = 1;
  //This we are doing 16 purposely because for date after ovulation day
  //pregnancy chance is medium and not high
  ovulationDays[ovulationStart.add(1, 'days').format('YYYY-MM-DD')] = 100 - indexer * 16;

  return ovulationDays;
};

const findDateRangeToStart = (today, periodDays) => {
  //Date from which we have to check start checking
  const monthBefore = 12;

  const startDate = moment(today)
    .subtract(monthBefore, 'months')
    .format('YYYY-MM-DD');

  let clipIdx = 0;
  for (let indexer = 0; indexer < periodDays.length; indexer++) {
    const element = periodDays[indexer];
    if (element > startDate) {
      clipIdx = indexer;
      break;
    }
  }

  periodDays = periodDays.slice(clipIdx);
  return periodDays;
};

export default menstrual => {
  //Get period dates
  let markedDates = {};
  let dateNumbers = {};
  if (menstrual.periodDays.length > 0) {
    //We can perform calculations
    const today = moment(new Date()).format('YYYY-MM-DD');
    const periodDays = findDateRangeToStart(today, [].concat(menstrual.periodDays));
    if (periodDays.length > 0) {
      markedDates = performCalendarMarkation(today, menstrual);
    }
  }

  return {markedDates, dateNumbers};
};
