export const isDateBeforeToday = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateCopy = new Date(date.getTime());
  dateCopy.setHours(0, 0, 0, 0);

  return dateCopy < today;
};

export const findDateFromDates = (date, dates) => {
  const dateCopy = new Date(date.getTime());
  dateCopy.setHours(0, 0, 0, 0);

  return dates.find((d) => {
    const dCopy = new Date(d.getTime());
    dCopy.setHours(0, 0, 0, 0);
    return dCopy.getTime() === dateCopy.getTime();
  });
};

/** date should be a working day. */
export const getNextWorkingDay = (date) => {
  let nextWorkingDay = new Date(date.getTime());
  nextWorkingDay.setHours(0, 0, 0, 0);

  // First day is sunday
  if (date.getDay() === 5) {
    nextWorkingDay.setDate(nextWorkingDay.getDate() + 3);
    return nextWorkingDay;
  }

  nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
  return nextWorkingDay;
};

/** date should be a working day. */
export const getPrevioustWorkingDay = (date) => {
  let previousWorkingDay = new Date(date.getTime());
  previousWorkingDay.setHours(0, 0, 0, 0);

  // First day is sunday
  if (date.getDay() === 1) {
    previousWorkingDay.setDate(previousWorkingDay.getDate() - 3);
    return previousWorkingDay;
  }

  previousWorkingDay.setDate(previousWorkingDay.getDate() - 1);
  return previousWorkingDay;
};

export const getCurrentOrNextWorkingDay = (date = new Date()) => {
  let nextWorkingDay = new Date(date.getTime());
  nextWorkingDay.setHours(0, 0, 0, 0);

  // First day is sunday

  if (date.getDay() === 6) {
    nextWorkingDay.setDate(nextWorkingDay.getDate() + 2);
    return nextWorkingDay;
  }

  if (date.getDay() === 0) {
    nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
    return nextWorkingDay;
  }

  return date;
};

/** If date is on weekend, the next weeks' monday is returned. */
export const getCurrentOrNextWeeksMonday = (date = new Date()) => {
  const currentOrNextWorkingDay = getCurrentOrNextWorkingDay(date);
  // First day is sunday
  const currentOrNextWorkingDayNumber = currentOrNextWorkingDay.getDay();

  const monday = new Date(date.getTime());
  monday.setDate(
    currentOrNextWorkingDay.getDate() - (currentOrNextWorkingDayNumber - 1)
  );
  monday.setHours(0, 0, 0, 0);

  return monday;
};

export const getNextWorkingWeek = (currentMonday) => {
  const dates = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(currentMonday.getTime());
    date.setDate(currentMonday.getDate() + 7 + i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
};

export const getPreviousWorkingWeek = (currentMonday) => {
  const dates = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(currentMonday.getTime());
    date.setDate(currentMonday.getDate() - 7 + i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
};

export const getCurrentOrNextWorkingWeek = (date = new Date()) => {
  const currentOrNextWeeksMonday = getCurrentOrNextWeeksMonday(date);

  const dates = [];

  for (let i = 0; i < 5; i++) {
    const newDate = new Date(date.getTime());
    newDate.setDate(currentOrNextWeeksMonday.getDate() + i);
    newDate.setHours(0, 0, 0, 0);
    dates.push(newDate);
  }

  return dates;
};
