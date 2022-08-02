import { IsNotEmpty, IsString } from 'class-validator';

export class SetPassword {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  pwd: string;
}
