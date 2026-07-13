export const ETHIOPIAN_MONTHS = [
  "መስከረም", // 1
  "ጥቅምት",  // 2
  "ኅዳር",   // 3
  "ታኅሣሥ",  // 4
  "ጥር",    // 5
  "የካቲት",  // 6
  "መጋቢት",  // 7
  "ሚያዚያ",  // 8
  "ግንቦት",  // 9
  "ሰኔ",    // 10
  "ሐምሌ",   // 11
  "ነሐሴ",   // 12
  "ጳጉሜን",  // 13
];

export const ETHIOPIAN_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

export const ETHIOPIAN_YEARS = Array.from(
  { length: 67 },
  (_, i) => 1950 + i
);

// Convert Ethiopian date to Gregorian date
export function ethiopianToGregorian(
  day: number,
  month: number,
  year: number
): Date {
  // Ethiopian months 1-4 (መስከረም to ታኅሣሥ) fall in Gregorian year+8
  // Ethiopian months 5-13 (ጥር to ጳጉሜን) fall in Gregorian year+7
  const gregYear = month <= 4 ? year + 8 : year + 7;

  // Map Ethiopian month to Gregorian month and day offset
  // Ethiopian month 1 (መስከረም) starts ~Sep 11
  const monthMap: Record<number, { gMonth: number; offset: number }> = {
    1:  { gMonth: 9,  offset: 11 }, // መስከረም  → Sep
    2:  { gMonth: 10, offset: 11 }, // ጥቅምት   → Oct
    3:  { gMonth: 11, offset: 10 }, // ኅዳር     → Nov
    4:  { gMonth: 12, offset: 10 }, // ታኅሣሥ   → Dec
    5:  { gMonth: 1,  offset: 9  }, // ጥር      → Jan
    6:  { gMonth: 2,  offset: 8  }, // የካቲት    → Feb
    7:  { gMonth: 3,  offset: 10 }, // መጋቢት   → Mar
    8:  { gMonth: 4,  offset: 9  }, // ሚያዚያ   → Apr
    9:  { gMonth: 5,  offset: 9  }, // ግንቦት   → May
    10: { gMonth: 6,  offset: 8  }, // ሰኔ      → Jun
    11: { gMonth: 7,  offset: 8  }, // ሐምሌ    → Jul
    12: { gMonth: 8,  offset: 7  }, // ነሐሴ    → Aug
    13: { gMonth: 9,  offset: 6  }, // ጳጉሜን   → Sep
  };

  const { gMonth, offset } = monthMap[month];
  const gDay = day + offset;

  return new Date(gregYear, gMonth - 1, gDay);
}

// Calculate age from Ethiopian birthday string "DD/MM/YYYY"
export function calculateAgeFromEthiopian(birthday: string): number {
  if (!birthday) return 0;
  const parts = birthday.split("/").map(Number);
  if (parts.length !== 3) return 0;
  const [day, month, year] = parts;
  const gregorianBirth = ethiopianToGregorian(day, month, year);
  const today = new Date();
  let age = today.getFullYear() - gregorianBirth.getFullYear();
  const m = today.getMonth() - gregorianBirth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < gregorianBirth.getDate())) {
    age--;
  }
  return age;
}