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

// Convert Ethiopian date to Gregorian date accurately
export function ethiopianToGregorian(
  day: number,
  month: number,
  year: number
): Date {
  // 1. Determine if the PREVIOUS Ethiopian year was a leap year.
  // Ethiopian leap year happens when (year + 1) % 4 === 0.
  // If the next year is a leap year, Pagume has 6 days, pushing the New Year to Sept 12.
  const isEthiopianLeap = (year + 1) % 4 === 0;

  // 2. Adjust starting offsets based on the leap year cycle
  const newYearDay = isEthiopianLeap ? 12 : 11;
  const leapDayOffset = isEthiopianLeap ? 1 : 0;

  // 3. Map months with dynamic leap year offsets
  const monthMap: Record<number, { gMonth: number; offset: number }> = {
    1:  { gMonth: 9,  offset: newYearDay },     // መስከረም  → Sep 11 or 12
    2:  { gMonth: 10, offset: newYearDay },     // ጥቅምት   → Oct 11 or 12
    3:  { gMonth: 11, offset: newYearDay - 1 }, // ኅዳር     → Nov 10 or 11
    4:  { gMonth: 12, offset: newYearDay - 1 }, // ታኅሣሥ   → Dec 10 or 11
    5:  { gMonth: 1,  offset: 9 },              // ጥር      → Jan 9 (Static due to Gregorian leap alignment)
    6:  { gMonth: 2,  offset: 8 },              // የካቲት    → Feb 8
    7:  { gMonth: 3,  offset: 10 - leapDayOffset }, // መጋቢት   → Mar 10 or 9
    8:  { gMonth: 4,  offset: 9 - leapDayOffset },  // ሚያዚያ   → Apr 9 or 8
    9:  { gMonth: 5,  offset: 9 - leapDayOffset },  // ግንቦት   → May 9 or 8
    10: { gMonth: 6,  offset: 8 - leapDayOffset },  // ሰኔ      → Jun 8 or 7
    11: { gMonth: 7,  offset: 8 - leapDayOffset },  // ሐምሌ    → Jul 8 or 7
    12: { gMonth: 8,  offset: 7 - leapDayOffset },  // ነሐሴ    → Aug 7 or 6
    13: { gMonth: 9,  offset: 6 - leapDayOffset },  // ጳጉሜን   → Sep 6 or 5
  };

  // 4. Correct Year Crossings (Ethiopian months 1-4 fall in Gregorian year + 8)
  const gregYear = month <= 4 ? year + 8 : year + 7;
  const { gMonth, offset } = monthMap[month];
  
  // 5. Calculate Gregorian day
  const gDay = day + offset - 1;

  // Using UTC or local dates consistently. JavaScript's native Date constructor 
  // automatically handles day overflows (e.g. Sep 32 becomes Oct 2) perfectly.
  return new Date(gregYear, gMonth - 1, gDay);
}

// Calculate age from Ethiopian birthday string "DD/MM/YYYY"
export function calculateAgeFromEthiopian(birthday: string): number {
  if (!birthday) return 0;
  
  const parts = birthday.split("/").map(Number);
  if (parts.length !== 3) return 0;
  
  const [day, month, year] = parts;
  
  // Validate basic range constraints
  if (month < 1 || month > 13 || day < 1 || day > 30) return 0;
  if (month === 13 && day > 6) return 0; // Pagume cannot exceed 6 days

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
