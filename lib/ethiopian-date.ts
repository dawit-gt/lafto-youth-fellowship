export const ETHIOPIAN_MONTHS = [
  "መስከረም", // 1
  "ጥቅምት", // 2
  "ኅዳር", // 3
  "ታኅሣሥ", // 4
  "ጥር", // 5
  "የካቲት", // 6
  "መጋቢት", // 7
  "ሚያዚያ", // 8
  "ግንቦት", // 9
  "ሰኔ", // 10
  "ሐምሌ", // 11
  "ነሐሴ", // 12
  "ጳጉሜን", // 13
];

export const ETHIOPIAN_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export const ETHIOPIAN_YEARS = Array.from({ length: 67 }, (_, i) => 1950 + i);

// Julian Day Number epoch offset for the Ethiopian ("Amete Mihret") calendar.
// Calibrated against multiple independent real-world reference dates:
//  - Meskerem 1, 2012 = Sept 12, 2019 (WHO Ethiopia office announcement)
//  - Meskerem 1, 2013 = Sept 11, 2020
//  - Meskerem 1, 2016 = Sept 12, 2023 (widely reported news sources)
//  - Meskerem 1, 2017 = Sept 11, 2024
//  - Tahsas 29, 2017 (Genna/Christmas) = Jan 7, 2025
//  - Tir 11, 2017 (Timkat) = Jan 19, 2025
const JD_EPOCH_OFFSET_AMETE_MIHRET = 1724220;

// An Ethiopian year is a leap year (Pagume has 6 days) when (year + 1) % 4 === 0.
function isEthiopianLeapYear(year: number): boolean {
  return (year + 1) % 4 === 0;
}

// Convert an Ethiopian calendar date to its Julian Day Number.
// Months 1-12 always have 30 days; only Pagume (month 13) varies (5 or 6 days),
// and since it's the last month, it doesn't affect the day-count math for
// any earlier month/day combination.
function ethiopianToJDN(year: number, month: number, day: number): number {
  return (
    day +
    30 * (month - 1) +
    365 * (year - 1) +
    Math.floor(year / 4) +
    JD_EPOCH_OFFSET_AMETE_MIHRET
  );
}

// Standard Julian Day Number -> Gregorian calendar date (Fliegel & Van Flandern).
function jdnToGregorian(jdn: number): { year: number; month: number; day: number } {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

// Convert Ethiopian date to Gregorian date accurately
export function ethiopianToGregorian(day: number, month: number, year: number): Date {
  const jdn = ethiopianToJDN(year, month, day);
  const g = jdnToGregorian(jdn);
  return new Date(g.year, g.month - 1, g.day);
}

// Calculate age from Ethiopian birthday string "DD/MM/YYYY"
export function calculateAgeFromEthiopian(birthday: string): number {
  if (!birthday) return 0;

  const parts = birthday.split("/").map(Number);
  if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) return 0;

  const [day, month, year] = parts;

  // Validate basic range constraints
  if (month < 1 || month > 13 || day < 1 || day > 30) return 0;
  if (month === 13) {
    const maxPagumeDay = isEthiopianLeapYear(year) ? 6 : 5;
    if (day > maxPagumeDay) return 0; // Pagume cannot exceed 5 (or 6 in a leap year) days
  }

  const gregorianBirth = ethiopianToGregorian(day, month, year);
  const today = new Date();

  let age = today.getFullYear() - gregorianBirth.getFullYear();
  const m = today.getMonth() - gregorianBirth.getMonth();

  // If birthday hasn't occurred yet this year, subtract 1 year
  if (m < 0 || (m === 0 && today.getDate() < gregorianBirth.getDate())) {
    age--;
  }

  return age;
}