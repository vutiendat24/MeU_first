import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsDateString,
} from 'class-validator';

export class CreateAuthDto {}

export class RegisterUserDto {
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Họ và tên không được để trống!' })
  @MinLength(2, { message: 'Họ và tên phải có ít nhất 2 ký tự!' })
  @MaxLength(100, { message: 'Họ và tên không được vượt quá 100 ký tự!' })
  name: string;

  @IsString({ message: 'Tên đăng nhập phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống!' })
  @MinLength(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' })
  @MaxLength(30, { message: 'Tên đăng nhập không được vượt quá 30 ký tự!' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới!',
  })
  username: string;

  @IsEmail({}, { message: 'Email không đúng định dạng!' })
  @IsNotEmpty({ message: 'Email không được để trống!' })
  @MaxLength(255, { message: 'Email không được vượt quá 255 ký tự!' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống!' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
  @MaxLength(64, { message: 'Mật khẩu không được vượt quá 64 ký tự!' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!',
  })
  password: string;

  @IsNotEmpty({ message: 'Ngày sinh không được để trống!' })
  @IsDateString({}, { message: 'Ngày sinh không đúng định dạng (YYYY-MM-DD)!' })
  dob: string;

  @IsString({ message: 'Giới tính phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Giới tính không được để trống!' })
  @IsIn(['male', 'female', 'other'], {
    message: 'Giới tính phải là male, female hoặc other!',
  })
  gender: string;

  @IsString({ message: 'Địa chỉ phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống!' })
  @MinLength(5, { message: 'Địa chỉ phải có ít nhất 5 ký tự!' })
  @MaxLength(200, { message: 'Địa chỉ không được vượt quá 200 ký tự!' })
  address: string;
}
