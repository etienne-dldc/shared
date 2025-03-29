import { Temporal } from "temporal-polyfill";
import "temporal-polyfill/global";

const dateFormatter = Intl.DateTimeFormat("fr-FR", { dateStyle: "full" });

export function formatDate(date: Date | Temporal.PlainDate) {
  return capitalize(dateFormatter.format(date));
}

const dateMonthFormatter = Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
});

export function formatDateMonth(date: Date | Temporal.PlainDate) {
  return capitalize(dateMonthFormatter.format(date));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatAge(date: Temporal.PlainDate) {
  const today = Temporal.Now.plainDateISO();
  const diff = today.since(date.withCalendar(today.calendarId), {
    largestUnit: "years",
  });
  const age = diff.years;
  return `${age} ans`;
}

export function formatPhoneNumber(phoneNumber: string, options: { dot?: boolean } = {}) {
  const phoneClean = phoneNumber.replace(/\D/g, "");
  // 06... or 07...
  if (phoneClean.length === 10 && phoneClean.match(/^0(6|7)/)) {
    const parts = /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
    if (options.dot) {
      return phoneClean.replace(parts, "$1.$2.$3.$4.$5");
    }
    return phoneClean.replace(parts, "$1 $2 $3 $4 $5");
  }
  // +33667951048 ...
  if (phoneClean.length === 11 && phoneClean.startsWith("33")) {
    const parts = /^33(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/;
    if (options.dot) {
      return phoneClean.replace(parts, "+33.$1.$2.$3.$4.$5");
    }
    return phoneClean.replace(parts, "+33 $1 $2 $3 $4 $5");
  }
  return phoneNumber;
}

const nativeDateFormatter = Intl.DateTimeFormat("fr-FR", {
  dateStyle: "full",
});

export function formatNativeDateStr(date: string) {
  return capitalize(nativeDateFormatter.format(new Date(date)));
}
