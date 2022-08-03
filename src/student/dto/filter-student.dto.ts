import { expectedTypeWork, expectedContractType } from 'src/types/student';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterStudent {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  courseEngagment: number[] = [1, 2, 3, 4, 5];
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  courseCompletion: number[] = [1, 2, 3, 4, 5];
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  @IsOptional()
  projectDegree: number[] = [1, 2, 3, 4, 5];
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ArrayMaxSize(5)
  teamProjectDegree: number[] = [1, 2, 3, 4, 5];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  expectedTypeWork: expectedTypeWork[] = [
    expectedTypeWork.HEBRID,
    expectedTypeWork.ONSITE,
    expectedTypeWork.NOMETTER,
    expectedTypeWork.RELOCATION,
    expectedTypeWork.NOMETTER,
  ];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  expectedContractType: expectedContractType[] = [
    expectedContractType.B2B,
    expectedContractType.NO,
    expectedContractType.UOP,
    expectedContractType.UZ,
  ];
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(2)
  expectedSalary: number[] = [0, 999999];
  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  @ArrayMaxSize(2)
  canTakeApprenticeship: boolean[] = [true, false];
  @IsOptional()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(1)
  monthsOfCommercialExp: number[] = [0];
}
