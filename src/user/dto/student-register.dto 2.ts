import { UserRole } from "../../types/user";
import { IsEmail, IsNumber, IsString, Max, Min } from "class-validator";

export class registerStudent {
  @IsEmail()
  email: string;
  @IsNumber()
  @Min(0)
  @Max(5)
  courseCompletion: number;
  @IsNumber()
  @Min(0)
  @Max(5)
  courseEngagment: number;
  @IsNumber()
  @Min(0)
  @Max(5)
  projectDegree: number;
  @IsNumber()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;
  @IsString()
  bonusProjectUrls: string;
  role: UserRole;
}
