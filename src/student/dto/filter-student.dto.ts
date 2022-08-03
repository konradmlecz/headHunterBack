import { expectedContractType, expectedTypeWork } from 'src/types/student';
import { IsOptional } from 'class-validator';

export class FilterStudent {
  @IsOptional()
  courseEngagment: number[] = [1, 2, 3, 4, 5];
  // @IsOptional()
  // @IsNumber()
  // @Min(1)
  // @Max(5)
  @IsOptional()
  courseCompletion: number[] = [1, 2, 3, 4, 5];
  @IsOptional()
  // @IsNumber()
  // @Min(1)
  // @Max(5)
  @IsOptional()
  projectDegree: number[] = [1, 2, 3, 4, 5];
  // @IsOptional()
  // @IsNumber()
  // @Min(1)
  // @Max(5)
  @IsOptional()
  teamProjectDegree: number[] = [1, 2, 3, 4, 5];
  @IsOptional()
  expectedTypeWork: expectedTypeWork[] = [
    null,
    expectedTypeWork.HEBRID,
    expectedTypeWork.ONSITE,
    expectedTypeWork.NOMETTER,
    expectedTypeWork.RELOCATION,
    expectedTypeWork.NOMETTER,
  ];
  @IsOptional()
  // @IsString()
  // @IsEnum(expectedTypeWork)
  expectedContractType: expectedContractType[] = [
    null,
    expectedContractType.B2B,
    expectedContractType.NO,
    expectedContractType.UOP,
    expectedContractType.UZ,
  ];
  @IsOptional()
  // @IsNumber()
  expectedSalary: number[] = [0, 999999];
  @IsOptional()
  // @IsBoolean()
  canTakeApprenticeship: boolean[] = [true, false];
  @IsOptional()
  // @IsNumber()
  monthsOfCommercialExp: number = 0;
}
