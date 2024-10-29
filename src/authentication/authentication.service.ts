import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(@InjectModel('Users') private userModel: Model<CreateUserDto>) {}

  create(user: CreateUserDto) {
    return this.userModel.create(user);
  }

  findOne(email: string, password: string) {
    return this.userModel.findOne({ email, password });
  }
}
