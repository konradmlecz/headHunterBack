import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class HeadhunterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString()
  fullName: string;
  @IsNotEmpty()
  @IsString()
  company: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
