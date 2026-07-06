import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
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
  ) { }

  async register(registerUserDto: RegisterUserDto) {
    const { name, username, email, password, age, gender, address } = registerUserDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new ConflictException('Email address or username is already registered!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      username,
      email,
      password: hashedPassword,
      age,
      gender,
      address,
    });

    await newUser.save();

    return {
      statusCode: 201,
      message: 'User registered successfully!',
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        age: newUser.age,
        gender: newUser.gender,
        address: newUser.address,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password!');
    }

    const payload = { sub: user._id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      statusCode: 200,
      message: 'Login successful!',
      access_token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        address: user.address,
      },
    };
  }
}
