import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto { }

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name should not be empty!' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty!' })
  email: string;

  @IsNotEmpty({ message: 'Username should not be empty!' })
  username: string;

  @IsNotEmpty({ message: 'Password should not be empty!' })
  password: string;


  @IsNotEmpty({ message: 'Gender should not be empty!' })
  gender: string;

  @IsOptional()
  address?: string;
}
