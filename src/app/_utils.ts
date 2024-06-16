import { Waitlist } from "@types";
import {
  addYears,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  isAfter,
  isBefore,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subYears,
} from "date-fns";
import _ from "lodash";

export const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  
  return !isNaN(date.getTime());
};

export const formatDate = (date: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateParts = date
    .toLocaleDateString("en-IN", dateOptions)
    .split(",");
  const formattedDate =
    formattedDateParts.slice(0, 2).join(",") +
    formattedDateParts.slice(2).join(" ");

  const formattedTime = date
    .toLocaleTimeString("en-IN", timeOptions)
    .toUpperCase();

  return `${formattedDate} ${formattedTime}`;
};

export const filterCustomScheduledDate = (
  startDate: string,
  endDate: string,
  waitlist: Waitlist[]
) => {
  let newwaitlist = _.cloneDeep(waitlist);

  if (startDate) {
    newwaitlist = waitlist.filter(
      (data) => new Date(data.scheduled) >= new Date(startDate)
    );
  }
  if (endDate)
    newwaitlist = newwaitlist.filter(
      (data) => new Date(data.scheduled) <= new Date(endDate)
    );

  return newwaitlist;
};

export const filterLastThirtyDaysScheduleDate = (waitlist: Waitlist[]) => {
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);

  let newwaitlist = _.cloneDeep(waitlist);

  newwaitlist = waitlist.filter(
    (data) =>
      isAfter(data.scheduled, thirtyDaysAgo) && isBefore(data.scheduled, today)
  );

  return newwaitlist;
};

export const filterThisMonthScheduleDate = (waitlist: Waitlist[]) => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  let newwaitlist = _.cloneDeep(waitlist);

  newwaitlist = waitlist.filter(
    (data) => isAfter(data.scheduled, start) && isBefore(data.scheduled, end)
  );

  return newwaitlist;
};

export const filterLastMonthSchedule = (waitlist: Waitlist[]) => {
  const now = new Date();
  const start = startOfMonth(subMonths(now, 1));
  const end = endOfMonth(subMonths(now, 1));

  return waitlist.filter(
    (data) => isAfter(data.scheduled, start) && isBefore(data.scheduled, end)
  );
};

export const filterThisQuarterSchedule = (waitlist: Waitlist[]) => {
  const now = new Date();
  const start = startOfQuarter(now);
  const end = endOfQuarter(now);

  return waitlist.filter(
    (data) => isAfter(data.scheduled, start) && isBefore(data.scheduled, end)
  );
};

export const filterObjectsPastTwoQuarters = (waitlist: Waitlist[]) => {
  const today = new Date();
  const twoQuartersAgo = subQuarters(today, 2);

  return waitlist.filter((data) => isBefore(data.scheduled, twoQuartersAgo));
};

export const filterObjectsThisYear = (waitlist: Waitlist[]) => {
  const today = new Date();
  const endOfLastYear = endOfYear(subYears(today, 1));
  const startOfNextYear = startOfYear(addYears(today, 1));

  return waitlist.filter(
    (data) =>
      isAfter(data.scheduled, endOfLastYear) &&
      isBefore(data.scheduled, startOfNextYear)
  );
};

export const filterObjectsLastYear = (waitlist: Waitlist[]) => {
  const today = new Date();
  const endOfSecondLastYear = endOfYear(subYears(today, 2));
  const startOfThisYear = startOfYear(today);

  return waitlist.filter(
    (data) =>
      isAfter(data.scheduled, endOfSecondLastYear) &&
      isBefore(data.scheduled, startOfThisYear)
  );
};
