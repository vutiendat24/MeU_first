import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/auth.schema';
import { RegisterUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { name, username, email, password, dob, gender, address } =
      registerUserDto;

    // Kiểm tra tuổi hợp lệ (phải trên 13 tuổi)
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge =
      monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1
        : age;

    if (birthDate > today) {
      throw new BadRequestException('Ngày sinh không thể là ngày trong tương lai!');
    }
    if (actualAge < 13) {
      throw new BadRequestException('Bạn phải đủ 13 tuổi để đăng ký!');
    }
    if (actualAge > 120) {
      throw new BadRequestException('Ngày sinh không hợp lệ!');
    }

    // Kiểm tra email và username đã tồn tại chưa
    const existingEmail = await this.userModel.findOne({ email });
    if (existingEmail) {
      throw new ConflictException('Email này đã được đăng ký, vui lòng dùng email khác!');
    }

    const existingUsername = await this.userModel.findOne({ username });
    if (existingUsername) {
      throw new ConflictException('Tên đăng nhập này đã tồn tại, vui lòng chọn tên khác!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      username,
      email,
      password: hashedPassword,
      dob,
      gender,
      address,
    });

    await newUser.save();

    return {
      statusCode: 201,
      message: 'Đăng ký tài khoản thành công!',
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        dob: newUser.dob,
        gender: newUser.gender,
        address: newUser.address,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }

    const payload = { sub: user._id, username: user.username, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      statusCode: 200,
      message: 'Đăng nhập thành công!',
      access_token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        dob: user.dob,
        gender: user.gender,
        address: user.address,
      },
    };
  }
}
