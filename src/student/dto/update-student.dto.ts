import { expectedContractType, expectedTypeWork } from '../../types/student';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { IsNull } from 'typeorm';

export class UpdateStudentDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @IsOptional()
  @IsInt()
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

  @IsOptional()
  @IsString()
  portfolioUrls: string;

  @IsString()
  projectUrls: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsEnum(expectedTypeWork)
  expectedTypeWork: expectedTypeWork;

  @IsOptional()
  @IsString()
  targetWorkCity: string;

  @IsEnum(expectedContractType)
  expectedContractType: expectedContractType;

  @IsOptional()
  @IsString()
  expectedSalary: string;

  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsInt()
  @Min(0)
  monthsOfCommercialExp: number;

  @IsOptional()
  @IsString()
  education: string | null;

  @IsOptional()
  @IsString()
  workExperience: string;

  @IsOptional()
  @IsString()
  courses: string;
}
