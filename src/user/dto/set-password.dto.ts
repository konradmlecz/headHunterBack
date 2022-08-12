import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SetPassword {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message: 'Password is too short',
  })
  @MaxLength(255, {
    message: 'Password is too long',
  })
  pwd: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
