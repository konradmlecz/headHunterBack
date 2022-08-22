import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Password is too short',
  })
  @MaxLength(255, {
    message: 'Password is too long',
  })
  newPwd: string;
}
