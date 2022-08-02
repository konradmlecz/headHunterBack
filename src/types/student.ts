export enum expectedTypeWork {
  ONSITE = 'Na miejscu',
  RELOCATION = 'Gotowość do przeprowadzki',
  REMOTELY = 'Wyłącznie zdalnie',
  HEBRID = 'Hybrydowo',
  NOMETTER = 'Bez znaczenia',
}

export enum expectedContractType {
  UOP = 'Tylko UoP',
  B2B = 'Możliwe B2B',
  UZ = 'Możliwe UZ/UoD',
  NO = 'Brak',
}

export interface Student {
  id?: string;
  email: string;
  phone: number;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string;
  projectUrls: string;
  bio: string;
  expectedTypeWork: expectedTypeWork;
  targetWorkCity: string;
  expectedContractType: expectedContractType;
  expectedSalary: string;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
}

export type UpdateStudentResponse = {
  isSuccess: boolean;
  error?: string;
};

export type GetOneStudentResponse = {
  isSuccess: boolean;
  data: Student;
};

export type GetStudentsResponse = {
  isSuccess: boolean;
  data: Student[];
  totalPages: number;
};

export type FilterStudent = {
  courseEngagment?: number;
  courseCompletion?: number;
  projectDegree?: number;
  teamProjectDegree?: number;
  expectedTypeWork?: expectedTypeWork;
  expectedSalary?: number;
  expectedContractType?: expectedContractType;
  canTakeApprenticeship?: boolean;
  monthsOfCommercialExp?: number;
};
