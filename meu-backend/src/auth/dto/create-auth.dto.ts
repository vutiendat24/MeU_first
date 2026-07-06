import { IsEmail, IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty({ message: 'Date of birth should not be empty!' })
  dob: string;

  @IsNotEmpty({ message: 'Gender should not be empty!' })
  gender: string;

  @IsNotEmpty({ message: 'Address should not be empty!' })
  address: string;
}
