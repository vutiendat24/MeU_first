import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Tên đăng nhập phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống!' })
  @MaxLength(30, { message: 'Tên đăng nhập không hợp lệ!' })
  username: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống!' })
  @MaxLength(64, { message: 'Mật khẩu không hợp lệ!' })
  password: string;
}
