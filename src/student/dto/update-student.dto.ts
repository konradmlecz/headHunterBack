import { expectedContractType, expectedTypeWork } from '../../types/student';

export class UpdateStudentDto {
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

export interface SetPassword {
  id: string;
  pwd: string;
}
