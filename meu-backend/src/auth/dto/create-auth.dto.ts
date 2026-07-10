import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsDateString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'customEmail', async: false })
export class CustomEmailConstraint implements ValidatorConstraintInterface {
  validate(val: any, args: ValidationArguments) {
    if (typeof val !== 'string') return false;
    const t = val.trim();
    if (!t) return false;
    if (t.length > 50) return false;
    const parts = t.split('@');
    if (parts.length !== 2 || !parts[0] || !parts[1]) return false;
    const [local, domain] = parts;
    if (!/^[a-zA-Z0-9]/.test(local)) return false;
    if (!/[a-zA-Z0-9]$/.test(local)) return false;
    if (!/^[a-zA-Z0-9._-]+$/.test(local)) return false;
    if (/[._-]{2,}/.test(local)) return false;
    if (!/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(domain)) return false;
    if (/\.{2,}/.test(domain)) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const val = args.value;
    if (typeof val !== 'string') return 'Email phải là chuỗi ký tự.';
    const t = val.trim();
    if (!t) return 'Vui lòng nhập địa chỉ email.';
    if (t.length > 50) return 'Email không được vượt quá 50 ký tự.';
    const parts = t.split('@');
    if (parts.length !== 2 || !parts[0] || !parts[1]) return 'Email không hợp lệ: phải có chính xác một dấu "@".';
    const [local, domain] = parts;
    if (!/^[a-zA-Z0-9]/.test(local)) return 'Email phải bắt đầu bằng một chữ cái hoặc số.';
    if (!/[a-zA-Z0-9]$/.test(local)) return 'Email phải kết thúc bằng một chữ cái hoặc số.';
    if (!/^[a-zA-Z0-9._-]+$/.test(local)) return 'Email chỉ được chứa chữ cái, số, ".", "_", "-".';
    if (/[._-]{2,}/.test(local)) return 'Email không được có các ký tự đặc biệt liên tiếp (ví dụ: "..", "--").';
    if (!/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(domain)) return 'Tên miền không hợp lệ (ví dụ: gmail.com).';
    if (/\.{2,}/.test(domain)) return 'Tên miền không được có các dấu chấm liên tiếp.';
    return 'Email không hợp lệ.';
  }
}

export function IsCustomEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CustomEmailConstraint,
    });
  };
}

export class CreateAuthDto {}

export class RegisterUserDto {
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Họ và tên không được để trống!' })
  @MinLength(2, { message: 'Họ và tên phải có ít nhất 2 ký tự!' })
  @MaxLength(50, { message: 'Họ và tên không được vượt quá 50 ký tự!' })
  name: string;

  @IsString({ message: 'Tên đăng nhập phải là chuỗi ký tự!' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống!' })
  @MinLength(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' })
  @MaxLength(30, { message: 'Tên đăng nhập không được vượt quá 30 ký tự!' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Tên đăng nhập chỉ được dùng chữ cái, số và dấu gạch dưới!',
  })
  username: string;

  @IsCustomEmail()
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
