import { expectedContractType } from 'src/types/student';

import { expectedTypeWork } from 'src/types/student';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class FilterStudent {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  courseEngagment?: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  courseCompletion?: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  projectDegree?: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  teamProjectDegree?: number;
  @IsOptional()
  @IsString()
  @IsEnum(expectedTypeWork)
  expectedTypeWork?: expectedTypeWork;
  @IsOptional()
  @IsNumber()
  expectedSalary?: number;
  @IsOptional()
  @IsString()
  @IsEnum(expectedTypeWork)
  expectedContractType?: expectedContractType;
  @IsOptional()
  @IsBoolean()
  canTakeApprenticeship?: boolean;
  @IsOptional()
  @IsNumber()
  monthsOfCommercialExp?: number;
}
