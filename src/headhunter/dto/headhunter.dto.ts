import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class HeadhunterDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(3, 255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 13)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 28)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
