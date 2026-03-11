export interface Country {
  id: string;
  name: string;
  flag: string;
  tuitionFee: { min: number; max: number };
  costOfLiving: number;
  partTimeHours: number;
  postStudyVisa: string;
  prOpportunity: string;
  currency: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  ranking: number;
  tuitionFee: number;
  location: string;
  courses: string[];
  acceptanceRate: number;
  minGPA: number;
  minIELTS: number;
  minTOEFL: number;
  image: string;
}

export const countries: Country[] = [
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    tuitionFee: { min: 20000, max: 55000 },
    costOfLiving: 15000,
    partTimeHours: 20,
    postStudyVisa: "1-3 years (OPT)",
    prOpportunity: "Moderate (H1B lottery)",
    currency: "USD",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    tuitionFee: { min: 12000, max: 38000 },
    costOfLiving: 12000,
    partTimeHours: 20,
    postStudyVisa: "2 years",
    prOpportunity: "Moderate (Skilled Worker)",
    currency: "GBP",
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tuitionFee: { min: 15000, max: 35000 },
    costOfLiving: 12000,
    partTimeHours: 20,
    postStudyVisa: "1-3 years (PGWP)",
    prOpportunity: "High (Express Entry)",
    currency: "CAD",
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tuitionFee: { min: 20000, max: 45000 },
    costOfLiving: 14000,
    partTimeHours: 48,
    postStudyVisa: "2-4 years",
    prOpportunity: "High (Points-based)",
    currency: "AUD",
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    tuitionFee: { min: 10000, max: 15000 },
    costOfLiving: 10000,
    partTimeHours: 20,
    postStudyVisa: "18 months",
    prOpportunity: "High (Settlement Permit)",
    currency: "EUR",
  },
  {
    id: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    tuitionFee: { min: 10000, max: 25000 },
    costOfLiving: 12000,
    partTimeHours: 20,
    postStudyVisa: "1-2 years",
    prOpportunity: "Moderate (Stamp 4)",
    currency: "EUR",
  },
];

export const universities: University[] = [
  { id: "1", name: "MIT", country: "usa", ranking: 1, tuitionFee: 55000, location: "Cambridge, MA", courses: ["Computer Science", "Engineering", "Business"], acceptanceRate: 4, minGPA: 3.9, minIELTS: 7.0, minTOEFL: 100, image: "" },
  { id: "2", name: "Stanford University", country: "usa", ranking: 3, tuitionFee: 52000, location: "Stanford, CA", courses: ["Computer Science", "Engineering", "Medicine"], acceptanceRate: 5, minGPA: 3.8, minIELTS: 7.0, minTOEFL: 100, image: "" },
  { id: "3", name: "University of Oxford", country: "uk", ranking: 4, tuitionFee: 35000, location: "Oxford, England", courses: ["Law", "Medicine", "Business"], acceptanceRate: 17, minGPA: 3.7, minIELTS: 7.0, minTOEFL: 100, image: "" },
  { id: "4", name: "University of Cambridge", country: "uk", ranking: 5, tuitionFee: 33000, location: "Cambridge, England", courses: ["Engineering", "Science", "Arts"], acceptanceRate: 21, minGPA: 3.7, minIELTS: 7.5, minTOEFL: 110, image: "" },
  { id: "5", name: "University of Toronto", country: "canada", ranking: 18, tuitionFee: 32000, location: "Toronto, ON", courses: ["Computer Science", "Engineering", "Business"], acceptanceRate: 43, minGPA: 3.5, minIELTS: 6.5, minTOEFL: 89, image: "" },
  { id: "6", name: "University of British Columbia", country: "canada", ranking: 35, tuitionFee: 28000, location: "Vancouver, BC", courses: ["Science", "Engineering", "Arts"], acceptanceRate: 52, minGPA: 3.3, minIELTS: 6.5, minTOEFL: 89, image: "" },
  { id: "7", name: "University of Melbourne", country: "australia", ranking: 14, tuitionFee: 38000, location: "Melbourne, VIC", courses: ["Business", "Engineering", "Medicine"], acceptanceRate: 70, minGPA: 3.3, minIELTS: 6.5, minTOEFL: 79, image: "" },
  { id: "8", name: "University of Sydney", country: "australia", ranking: 19, tuitionFee: 36000, location: "Sydney, NSW", courses: ["Law", "Business", "Engineering"], acceptanceRate: 65, minGPA: 3.2, minIELTS: 6.5, minTOEFL: 85, image: "" },
  { id: "9", name: "Technical University of Munich", country: "germany", ranking: 30, tuitionFee: 15000, location: "Munich, Bavaria", courses: ["Engineering", "Computer Science", "Science"], acceptanceRate: 40, minGPA: 3.0, minIELTS: 6.5, minTOEFL: 88, image: "" },
  { id: "10", name: "LMU Munich", country: "germany", ranking: 32, tuitionFee: 10000, location: "Munich, Bavaria", courses: ["Medicine", "Science", "Arts"], acceptanceRate: 38, minGPA: 3.0, minIELTS: 6.0, minTOEFL: 80, image: "" },
  { id: "11", name: "Harvard University", country: "usa", ranking: 2, tuitionFee: 54000, location: "Cambridge, MA", courses: ["Law", "Medicine", "Business"], acceptanceRate: 3, minGPA: 3.9, minIELTS: 7.5, minTOEFL: 109, image: "" },
  { id: "12", name: "Trinity College Dublin", country: "ireland", ranking: 81, tuitionFee: 18000, location: "Dublin", courses: ["Computer Science", "Business", "Arts"], acceptanceRate: 55, minGPA: 3.0, minIELTS: 6.5, minTOEFL: 88, image: "" },
  { id: "13", name: "University of Waterloo", country: "canada", ranking: 112, tuitionFee: 25000, location: "Waterloo, ON", courses: ["Computer Science", "Engineering", "Math"], acceptanceRate: 53, minGPA: 3.2, minIELTS: 6.5, minTOEFL: 90, image: "" },
  { id: "14", name: "Imperial College London", country: "uk", ranking: 6, tuitionFee: 36000, location: "London, England", courses: ["Engineering", "Medicine", "Science"], acceptanceRate: 14, minGPA: 3.7, minIELTS: 7.0, minTOEFL: 100, image: "" },
  { id: "15", name: "UNSW Sydney", country: "australia", ranking: 45, tuitionFee: 34000, location: "Sydney, NSW", courses: ["Engineering", "Business", "Science"], acceptanceRate: 60, minGPA: 3.0, minIELTS: 6.5, minTOEFL: 83, image: "" },
];

export const allCourses = ["Computer Science", "Engineering", "Business", "Medicine", "Law", "Science", "Arts", "Math"];

export interface SavedUniversity {
  universityId: string;
  savedAt: string;
}

export interface ComparisonHistory {
  countries: string[];
  date: string;
}

export const mockDashboard = {
  savedUniversities: ["1", "5", "9", "12"] as string[],
  comparisonHistory: [
    { countries: ["usa", "canada"], date: "2025-02-20" },
    { countries: ["uk", "germany", "ireland"], date: "2025-02-18" },
    { countries: ["australia", "canada"], date: "2025-02-15" },
  ] as ComparisonHistory[],
  applicationProgress: [
    { university: "MIT", status: "applied" as const, date: "2025-02-10" },
    { university: "University of Toronto", status: "shortlisted" as const, date: "2025-02-12" },
    { university: "TU Munich", status: "in-progress" as const, date: "2025-02-14" },
    { university: "Trinity College Dublin", status: "accepted" as const, date: "2025-01-28" },
  ],
};
