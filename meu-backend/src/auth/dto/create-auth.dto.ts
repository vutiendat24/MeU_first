import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAuthDto { }

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name should not be empty!' })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  name: string;

  @IsEmail({}, { message: 'Invalid email format!' })
  @IsNotEmpty({ message: 'Email should not be empty!' })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  email: string;

  @MinLength(3, { message: 'Username must be at least 3 characters long!' })
  @IsNotEmpty({ message: 'Username should not be empty!' })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  username: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  @IsNotEmpty({ message: 'Password should not be empty!' })
  password: string;


  @IsNotEmpty({ message: 'Date of birth should not be empty!' })
  dob: string;


  @IsNotEmpty({ message: 'Gender should not be empty!' })
  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be male, female, or other!',
  })
  gender: string;

  @IsNotEmpty({ message: 'Address should not be empty!' })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  address: string;
}
