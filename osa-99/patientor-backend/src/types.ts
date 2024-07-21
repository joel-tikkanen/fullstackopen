export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  occupation: string;
  ssn: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PublicPatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
