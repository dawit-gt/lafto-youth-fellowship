// Ethiopian months
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
  { length: 50 },
  (_, i) => 2000 + i
);

// Convert Ethiopian date to Gregorian to calculate age
export function ethiopianToGregorian(
  day: number,
  month: number,
  year: number
): Date {
  // Ethiopian calendar offset: ET year + 7 or 8 = Gregorian year
  const gregYear = year + 7;
  const gregMonth = month + 2; // approximate
  return new Date(gregYear, gregMonth - 1, day);
}

// Calculate age from Ethiopian birthday string "DD/MM/YYYY"
export function calculateAgeFromEthiopian(birthday: string): number {
  if (!birthday) return 0;
  const [day, month, year] = birthday.split("/").map(Number);
  const gregorianBirth = ethiopianToGregorian(day, month, year);
  const today = new Date();
  let age = today.getFullYear() - gregorianBirth.getFullYear();
  const m = today.getMonth() - gregorianBirth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < gregorianBirth.getDate())) {
    age--;
  }
  return age;
}