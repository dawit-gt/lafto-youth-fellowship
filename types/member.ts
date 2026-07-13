export type MemberStatus = "Student" | "Employed" | "Unemployed";

export type EducationLevel =
  | "Grade 1" | "Grade 2" | "Grade 3" | "Grade 4"
  | "Grade 5" | "Grade 6" | "Grade 7" | "Grade 8"
  | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12"
  | "University Year 1" | "University Year 2" | "University Year 3"
  | "University Year 4" | "University Year 5"
  | null;

export interface Member {
  id: string;
  full_name: string;
  gender: "Male" | "Female";
  age: number;
  phone: string;
  status: MemberStatus;
  education_level: EducationLevel;
  occupation: string;
  photo_url: string;
  bio: string;
}