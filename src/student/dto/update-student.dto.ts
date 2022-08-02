import { expectedContractType, expectedTypeWork } from '../../types/student';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateStudentDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @IsInt()
  @Length(9, 11)
  phone: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 13)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 28)
  lastName: string;

  @IsString()
  @Length(4, 39)
  githubUsername: string;

  @IsString()
  portfolioUrls: string;

  @IsString()
  projectUrls: string;

  @IsString()
  bio: string;

  @IsEnum(expectedTypeWork)
  expectedTypeWork: expectedTypeWork;

  @IsString()
  targetWorkCity: string;

  @IsEnum(expectedContractType)
  expectedContractType: expectedContractType;

  @IsString()
  expectedSalary: string;

  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsInt()
  @Min(0)
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
}

export interface SetPassword {
  id: string;
  pwd: string;
}
